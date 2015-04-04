$.profile = function() {
  return {
    
  };
};

$(function() {
  var keystrokes = $.profile.keystrokes();
  
  $(document).on('keydown',function(event) {
    console.log(JSON.stringify(keystrokes.getProfile()));
  });
});

