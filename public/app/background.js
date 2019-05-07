// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
   // Send a message to the active tab
   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
   });
   chrome.contextMenus.create({
      id: 'SELECTE_TEXT_MENU_ID',
      title: "Highlight",
      contexts: ["selection"],
      
   });
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.method == "getSelection")
      sendResponse({ data: window.getSelection().toString() });
   else
      sendResponse({}); // snub them.
});
// chrome.contextMenus.create({
//    id: 'SELECTE_TEXT_MENU_ID',
//    title: "Test",
//    contexts: ["selection"],
//    onclick: function (info, tab) {
//      console.log("info: " + JSON.stringify(info));
//      console.log("tab: " + JSON.stringify(tab));
//      //sendSearch(info.selectionText);

//    }
//  });


// chrome.contextMenus.onClicked.addListener((event) => {
//    if (event.menuItemId === 'SELECTE_TEXT_MENU_ID') {
//      chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
//        function(tab) {
//          chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
//          function(response){
//            // var text = document.getElementById('text'); 
//            // text.innerHTML = response.data;
//            alert('response.data');
//          });
//        });
//    }
//  });