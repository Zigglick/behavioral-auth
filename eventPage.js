//chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//    console.log(response.farewell);
//  });
//});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //sender.tab
  if(request.getHistory){
    chrome.history.search({text:'google'}, function(res) {
      //sendResponse({history: res});
      //alert('lol');
      console.log(res);
      sendResponse({history: 'lol'});
    });
    //sendResponse({history: 'lol2'});
  }
});

