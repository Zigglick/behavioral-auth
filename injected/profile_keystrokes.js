$.profile.keystrokes = function() {

  var keystrokes = $.profile();
  
  var dwellIntervals = [], flightIntervals = [], dwellTimer = [], flightTimer = [], dwell = [], flight = [], lastKey = 0;
  
  $(document).on('keydown',function(event) {
    var key = event.which;
    if(!dwellIntervals[key])
      dwellIntervals[key] = setInterval(function() {(function(key){dwellTimer[key] = dwellTimer[key] == undefined ? 0 : dwellTimer[key] + 1})(key)}, 10);
      
    clearInterval(flightIntervals[lastKey]);
    flightIntervals[lastKey] = null;
    if(flight[lastKey] == undefined) flight[lastKey] = [];
    if(flight[lastKey][key] == undefined) flight[lastKey][key] = [];
    
    if(flightTimer[lastKey] > 0) flight[lastKey][key].push(flightTimer[lastKey]);
    flightTimer[lastKey] = 0;
  });
  
  $(document).on('keyup',function(event) {
    var key = event.which;
    clearInterval(dwellIntervals[key]);
    dwellIntervals[key] = null;
    if(dwell[key] == undefined) dwell[key] = [];
    dwell[key].push(dwellTimer[key]);
    dwellTimer[key] = 0;
    
    lastKey = key;
    if(!flightIntervals[key])
      flightIntervals[key] = setInterval(function() {(function(key){flightTimer[key] = flightTimer[key] == undefined ? 0 : flightTimer[key] + 1})(key)}, 10);
      
    for(var i in flightIntervals){
      if(flightIntervals[i] > 1000){
        clearInterval(flightIntervals[i]);
        flightIntervals[i] = null;
      }
    }
  });
  
  keystrokes.getProfile = function() {
    return {dwell:dwell, flight:flight};
  };
  
  return keystrokes;
  
};

