import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Link, goBack } from 'route-lite';

const FirstPage = () => {
  return (
    <Link
      component={SecondPage}
      componentProps={{text: "Component B"}}
    >
      Component A
    </Link>
  );
}

const SecondPage = ({text}) => {
  return <div onClick={() => goBack()}>{text}</div>
}

export default FirstPage;

// ReactDOM.render(<Router><A /></Router>, document.querySelector('body'));
