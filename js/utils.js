// Plugins
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function(){
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});

// Helper functions
(function() {
  window.utils = {};
  utils.formatTime = function(seconds, dec) {
    var s = seconds || 0,
        h = parseInt(s / 3600) % 24,
        m = parseInt(s / 60) % 60,
        s = utils.round(s % 60, dec),
        string;
    // create format hh:mm:ss
    string = (h > 0 ? h + ':' : '') + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    // remove starting zeros
    if (string[0] == '0') string = string.substring(1, string.length);
    return string;
  };
  utils.getSeconds = function(string, dec) {
    var parts = string.split(':').reverse(),
        seconds = 0;
    // go from hh:mm:ss to seconds
    for (var i=parts.length-1; i>=0; i--) {
      switch(i) {
        case 2: // hours
          seconds += parseInt( parts[i] ) * 60 * 60;
          break;
        case 1: // minutes
          seconds += parseInt( parts[i] ) * 60;
          break;
        case 0: // seconds
          seconds += parseFloat( parts[i] );
          break
        default:
          break;
      }
    }
    return utils.round(seconds, dec);
  };
  utils.lerp = function(start, stop, percent) {
    return (stop - start) * percent + start;
  };
  utils.round = function(num, dec) {
    num = parseFloat(num);
    dec = dec || 0;
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
  };
})();
