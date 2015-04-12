$.profile = function() {
  // a flag should be raised whenever an abnormal behavior is detected
  var flags = [], sensitivity = 10;
  return {
    log: function(str) {
      var d = new Date();
      var datetext = d.toTimeString();
      datetext = datetext.split(' ')[0];
      console.log('Behavioral authentication plugin ('+datetext+'): '+str);
    },
    getSensitivity: function() {
      return sensitivity;
    },
    raiseFlag: function(entry) {
      flags.push(entry);
    },
    getFlags: function() {
      return flags;
    }
  };
};

$(function() {
  var keystrokes = $.profile.keystrokes();
  var history = $.profile.history();
  
  $(document).on('keydown',function(event) {
    keystrokes.log(JSON.stringify(keystrokes.getProfile()));
    history.log(JSON.stringify(history.getFlags()));
  });
});

