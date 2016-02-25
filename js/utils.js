// Plugins
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function(){
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});

Number.prototype.between = function(min, max) {
  return this >= min && this <= max;
};

// constants
var INACTIVE = 0;
var ACTIVE = 1;
var STARTING = 2;
var ENDING = 3;

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
  utils.getParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };
  utils.getSeconds = function(string, dec) {
    // handle hh:mm:ss+hh:mm:ss
    if (string.indexOf('+') >= 0) {
      var total = 0,
          strings = string.split('+');
      for (var i=0; i<strings.length; i++) {
        total += utils.getSeconds(strings[i]);
      }
      return total;
    }
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

var BSUtils = {
  doClassNames: function(classNames, t){
    _.each(classNames, function(c, i){
      if (t.between(c.start, c.end) && !c.invert) c.$el.addClass(c.name);
      else c.$el.removeClass(c.name);
    });
  },
  playSounds: function(sounds, t, p, b){
    _.each(sounds, function(sound, i){
      sound.direction = sound.direction.constructor === Array ? sound.direction : [sound.direction];
      if (t.between(sound.start, sound.end) && _.contains(sound.direction, p.direction)) {
        if (!sound.played) {
          sounds[i].played = true;
          b.play(sound.name, true);
        }
      } else if (sound.loop) {
        sounds[i].played = false;
        b.pause(sound.name, true);
      }
    });
  },
  resetSounds: function(sounds, b){
    _.each(sounds, function(sound, i){
      sounds[i].played = false;
      sound.loop && b.pause(sound.name, true);
    });
  }
};
