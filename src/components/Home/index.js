import React, { Component } from 'react'
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase/context';

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <Comments />

  </div>
);

class CommentsBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      loading: false,
      comments: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    console.log(this.props.firebase);
    this.props.firebase.comments()
      .orderByChild('userId')
      // .equalTo('VEZE8rVf2wPwvejYV8k8jCyZWbf1')
      .on('value', snapshot => {
        const commentObject = snapshot.val();
        if (commentObject) {
          const commentList = Object.keys(commentObject).map(key => ({
            ...commentObject[key],
            uid: key,
          }));
          this.setState({
            comments: commentList,
            loading: false,
          });
        } else {
          this.setState({ comments: null, loading: false });
        }
      });
  }
  componentWillUnmount() {
    this.props.firebase.comments().off();
  }
  onChangeText = event => {
    this.setState({ text: event.target.value });
  };
  onCreateComment = (event, authUser) => {
    this.props.firebase.comments().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    });
    this.setState({ text: '' });
    event.preventDefault();
  };
  onRemoveComment = (uid) => {
    this.props.firebase.comment(uid).remove();
  };
  onEditComment = (comment, text) => {
    const { uid, ...commentSnapshot } = comment;
    this.props.firebase.comment(comment.uid).set({
      ...commentSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };
  render() {
    const { text, comments, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div> Loading ...</div>}
            {comments ? (
              <CommentList
                comments={comments.filter(c => c.userId === authUser.uid)}
                onRemoveComment={this.onRemoveComment}
                onEditComment={this.onEditComment} />
            ) : (
                <div>There are no comments ...</div>
              )}
            <form onSubmit={event => this.onCreateComment(event, authUser)}>
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )
        }
      </AuthUserContext.Consumer>
    );
  }
}


const CommentList = ({ comments, onRemoveComment, onEditComment }) => (
  <ul>
    {comments.map(comment => (
      <CommentItem
        key={comment.uid}
        comment={comment}
        onRemoveComment={onRemoveComment}
        onEditComment={onEditComment} />
    ))}
  </ul>
);

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.comment.text,
    };
  }
  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.comment.text,
    }));
  };
  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };
  onSaveEditText = () => {
    this.props.onEditComment(this.props.comment, this.state.editText);
    this.setState({ editMode: false });
  };

  render() {
    const { comment, onRemoveComment } = this.props;
    const { editMode, editText } = this.state;
    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
            <span>
              <strong>{comment.userId}</strong> {comment.text}
              {comment.editedAt && <span>(Edited)</span>}
            </span>
          )}
        {editMode ? (
          <span>
            <button onClick={this.onSaveEditText}>Save</button>
            <button onClick={this.onToggleEditMode}>Reset</button>
          </span>
        ) : (
            <button onClick={this.onToggleEditMode}>Edit</button>
          )}
        {!editMode && (
          <button
            type="button"
            onClick={() => onRemoveComment(comment.uid)}
          >
            Delete
</button>
        )}


      </li>
    )
  }
}


const Comments = withFirebase(CommentsBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
