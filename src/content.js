/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";
import Router from 'route-lite';
import Navigation from './components/Navigation';
//import LandingPage from './components/Landing'


class Main extends React.Component {
  render() {
    return (
      <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
        <FrameContextConsumer>
          {
            // Callback is invoked with iframe's window and document instances
            ({ document, window }) => {
              // Render Children
              return (
                <div className={'my-extension'}>
                  <h1>Smart Highlighter  </h1>
                  <div className="App">
                    <div className="container">
                      <Navigation />
                    </div>
                    <Router>
                      <div></div>
                    </Router>
                  </div >
                </div>
              )
            }
          }

        </FrameContextConsumer>
      </Frame>
    )
  }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      toggle();
    }
  }
);

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}

chrome.contextMenus.onClicked.addListener((event) => {
  if (event.menuItemId === 'SELECTE_TEXT_MENU_ID') {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tab) {
        chrome.tabs.sendMessage(tab[0].id, { method: "getSelection" },
          function (response) {
            // var text = document.getElementById('text'); 
            // text.innerHTML = response.data;
            alert(response.data);
          });
      });
  }
});

