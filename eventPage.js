chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.getHistory){
    sendResponse({history: 'getHistory received...'});
    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
    chrome.history.search({
	      'text': '',              // Return every history item....
	      'startTime': oneWeekAgo  // that was accessed less than one week ago.
	    }, function(res) {
      
      console.log(res);
      console.log(request);
      

      var trust = request.sensitivity, sensitivity = trust;
      for(var i in res)
        if(res[i].url == request.url)
          trust -= sensitivity - res[i].visitCount;
      
      if(trust < sensitivity) //request.raiseFlag({trust: trust, url: request.url});
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {trust: trust, url: request.url}, function(response) {});
        });
        
      if(trust < sensitivity/3) chrome.browserAction.setIcon({path: 'icon_red.png'});
      else if(trust < 2*sensitivity/3) chrome.browserAction.setIcon({path: 'icon_orange.png'});
      else if(trust < sensitivity) chrome.browserAction.setIcon({path: 'icon_green.png'})
      else chrome.browserAction.setIcon({path: 'icon.png'})

    });
  }
});

