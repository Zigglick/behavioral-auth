$.profile.history = function() {

  var history = $.profile();
  
  chrome.runtime.sendMessage({getHistory: true}, function(response) {
    console.log(response.history);
  });
  
  return history;
  
};

