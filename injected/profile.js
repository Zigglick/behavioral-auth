$.profile = function() {
  return {
    
  };
};

$(function() {
  var keystrokes = $.profile.keystrokes();
  var history = $.profile.history();
  
  $(document).on('keydown',function(event) {
    console.log(JSON.stringify(keystrokes.getProfile()));
  });
});

