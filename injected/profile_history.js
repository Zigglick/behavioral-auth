$.profile.history = function() {

  var history = $.profile();
  var url = window.location.href;
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.url) history.raiseFlag(request);
  });
  
  chrome.runtime.sendMessage({getHistory: true, url: url, sensitivity: history.getSensitivity()}, function(response) {
    history.log(response.history);
  });
  
  history.log = function(str) {
    console.log('history');
    $.profile().log(str);
  };
  
  return history;

};

