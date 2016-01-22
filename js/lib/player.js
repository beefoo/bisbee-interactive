// Bisbee player
var BisbeePlayer = (function() {
  function BisbeePlayer(options) {
    var defaults = {};
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  BisbeePlayer.prototype.init = function(options){
    this.direction = 1.0;
    this.endTime = 0.0;
    this.minSpeed = options.minSpeed;
    this.maxSpeed = options.maxSpeed;
    this.normalSpeed = 1.0;
    this.normalSpeedPercent = (this.normalSpeed - this.minSpeed) / (this.maxSpeed - this.minSpeed);
    this.debug = options.debug;

    // set sequence
    this.setSequence(options.sequence);

    // Init speed to normal
    this.speed = this.normalSpeed;
    this.speedPercent = 0;

    // get currentTime
    var currentTime = utils.getParameterByName('t') || 0;
    if (currentTime) currentTime = utils.getSeconds(currentTime, 1);
    this.currentTime = currentTime;

    // load listeners
    this.loadListeners();

    if (this.currentTime) {
      this.started = true;
      this.play();
    }
  };

  BisbeePlayer.prototype.getCurrentTime = function(){
    return this.currentTime;
  };

  BisbeePlayer.prototype.isPlaying = function(){
    return this.playing;
  };

  BisbeePlayer.prototype.loadListeners = function(){
    var _this = this;

    // look for keydown up/down/shift keys
    $(window).keydown(function(e){
      switch(e.keyCode) {
        case 16: // shift
          e.preventDefault();
          _this.speed = _this.maxSpeed; // faster
          _this.speedPercent = 1.0;
          break;
        case 38: // up arrow
          e.preventDefault();
          if (!e.shiftKey) {
            _this.speed = _this.normalSpeed; // normal
            _this.speedPercent = _this.normalSpeedPercent;
          }
          _this.direction = 1.0;
          _this.play();
          break;
        case 40: // down arrow
          e.preventDefault();
          if (!e.shiftKey) {
            _this.speed = _this.normalSpeed; // normal
            _this.speedPercent = _this.normalSpeedPercent;
          }
          _this.direction = -1.0; // go in reverse
          _this.play();
          break;
      }
    });

    // look for keyup up/down/shift keys
    $(window).keyup(function(e){
      switch(e.keyCode) {
        case 16: // shift
          e.preventDefault();
          _this.speed = _this.normalSpeed; // normal
          _this.speedPercent = _this.normalSpeedPercent;
          break;
        case 38: // up arrow
        case 40: // down arrow
          e.preventDefault();
          _this.pause();
          break;
      }
    });

    // look for subscriptions
    $.subscribe('direction-change', function(e, direction){
      _this.direction = direction;
    });
    $.subscribe('speed-change', function(e, percent){
      _this.setSpeed(percent);
    });
    $.subscribe('player-play', function(e){
      if (!_this.playing) _this.play();
    });
    $.subscribe('player-pause', function(e){
      if (_this.playing) _this.pause();
    });
  };

  BisbeePlayer.prototype.onPause = function(){
    this.sequence.onPause(this);
  };

  BisbeePlayer.prototype.onProgress = function(){
    this.sequence.onProgress(this);
  };

  BisbeePlayer.prototype.onReset = function(){
    this.sequence.onReset(this);
  };

  BisbeePlayer.prototype.pause = function(){
    this.playing = false;
    this.speed = 0;
    this.speedPercent = 0;

    this.onPause();
  };

  BisbeePlayer.prototype.play = function(){
    var _this = this;

    this.timeThen = new Date();
    this.playing = true;

    window.requestAnimationFrame(function(){_this.progress();});
  };

  BisbeePlayer.prototype.progress = function(){
    var _this = this,
        timeNow = new Date(),
        timeSince = (timeNow - this.timeThen)/1000 * this.speed * this.direction;

    // increment time
    this.currentTime += timeSince;
    this.timeThen = timeNow;
    this.currentTime = _.max([this.currentTime, 0.0]);
    this.currentTime = _.min([this.currentTime, this.endTime]);

    this.onProgress();

    // reached the end
    if (this.currentTime >= this.endTime && this.direction > 0) {
      console.log('Reached End');
      this.pause();

    // reached beginning (from reverse)
    } else if (this.currentTime <= 0 && this.direction < 0) {
      console.log('Reached Start');
      this.pause();

    // next frame if playing
    } else if (this.playing) {
      window.requestAnimationFrame(function(){_this.progress();});
    }
  };

  BisbeePlayer.prototype.reset = function(){
    this.onReset();
  };

  BisbeePlayer.prototype.setSequence = function(sequence){
    this.sequence = sequence;
    this.endTime = this.sequence.getEndTime();
  };

  BisbeePlayer.prototype.setSpeed = function(percent){
    this.speedPercent = percent;
    this.speed = utils.lerp(this.minSpeed, this.maxSpeed, this.speedPercent);
  };

  return BisbeePlayer;

})();
