// Bisbee app
var Bisbee = (function() {
  function Bisbee(options) {
    var defaults = {
      min_speed: 0.5,
      max_speed: 2.0,
      debug: true
    };
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  Bisbee.prototype.init = function(options){
    var _this = this;

    this.sequence = [];
    this.direction = 1.0;
    this.endTime = 0.0;
    this.minSpeed = options.min_speed;
    this.maxSpeed = options.max_speed;
    this.normalSpeed = 1.0;
    this.normalSpeedPercent = (this.normalSpeed - this.minSpeed) / (this.maxSpeed - this.minSpeed);
    this.debug = options.debug;

    // Init speed to normal
    this.speed = this.normalSpeed;
    this.speedPercent = 0;

    // Load media
    this.loadMedia();

    // Load sequence
    if (options.sequence) {
      this.loadSequence(options.sequence);
      if (this.sequence.length)
        this.endTime = this.sequence[this.sequence.length-1]['end'];
    }

    this.reset();
    this.loadListeners();
    this.modalShow();

    if (this.debug) $('.debug').removeClass('hide');
  };

  Bisbee.prototype.loadListeners = function(){
    var _this = this;

    $('.show-modal').on('click', function(e){
      e.preventDefault();
      _this.modalShow();
    });

    $('.modal').on('click', function(e){
      e.preventDefault();
      _this.modalHide();
    });

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

    $('.hotspot').on('mouseover', function(e){
      _this.onHotspot($(this), e.clientY);
    });

    $('.hotspot').on('mousemove', function(e){
      _this.onHotspot($(this), e.clientY);
    });

    $('.hotspot').on('mouseout', function(){
      _this.pause();
    });

    $('.reset').on('click', function(){
      _this.reset();
    });
  };

  Bisbee.prototype.loadMedia = function(){
    var _this = this;

    this.media = {};

    $('video, audio').each(function(){
      _this.media[$(this).attr('data-id')] = $(this)[0];
      console.log('Loaded '+$(this)[0].src);
    });
  };

  Bisbee.prototype.loadSequence = function(sequence){
    var _this = this;

    _.each(sequence, function(step, i){
      // parse seconds
      step.id = i;
      step.name = step.el;
      step.$el = $(step.el);
      step.state = INACTIVE;
      step.start = utils.getSeconds(step.start);
      step.end = utils.getSeconds(step.end);

      _this.sequence.push(step);
    });
  };

  Bisbee.prototype.mediaPause = function(ids, reset){
    var _this = this;
    ids = ids.constructor === Array ? ids : [ids];

    _.each(ids, function(id){
      var m = _this.media[id];
      if (m && m.playing){
        m.pause();
        if (reset) m.currentTime = 0;
      }
    });
  };

  Bisbee.prototype.mediaPlay = function(ids, reset){
    var _this = this;
    ids = ids.constructor === Array ? ids : [ids];

    _.each(ids, function(id){
      var m = _this.media[id];
      if (m && !m.playing){
        if (reset) m.currentTime = 0;
        m.play();
      }
    });
  };

  Bisbee.prototype.modalHide = function(){
    $('.modal').removeClass('active');
    setTimeout(function(){
      $('.modal').addClass('hide');
    }, 1000);
  };

  Bisbee.prototype.modalShow = function(){
    $('.modal').removeClass('hide').addClass('active');
    if (this.currentTime > 0) {
      $('.modal .guide-confirm').addClass('active');
    } else {
      $('.modal .guide-confirm').removeClass('active');
    }
  };

  Bisbee.prototype.onHotspot = function($hotspot, y){
    var hHeight = $hotspot.height(),
        yDelta = $hotspot.hasClass('top') ? hHeight + $hotspot.offset().top - y : y - $hotspot.offset().top,
        percent = yDelta / hHeight;

    this.speedPercent = percent;
    this.speed = utils.lerp(this.minSpeed, this.maxSpeed, this.speedPercent);

    if ($hotspot.hasClass('bottom')) {
      this.direction = -1;
    } else {
      this.direction = 1;
    }

    if (this.speedPercent > 0.5) {
      $hotspot.addClass('fast');
    } else {
      $hotspot.removeClass('fast');
    }

    if (!this.playing) {
      this.play();
    }
  };

  Bisbee.prototype.pause = function(){
    this.playing = false;
    this.speed = 0;
    this.speedPercent = 0;
    this.render();
  };

  Bisbee.prototype.play = function(){
    var _this = this;

    this.timeThen = new Date();
    this.playing = true;

    window.requestAnimationFrame(function(){_this.progress();});
  };

  Bisbee.prototype.progress = function(){
    var _this = this,
        timeNow = new Date(),
        timeSince = (timeNow - this.timeThen)/1000 * this.speed * this.direction;

    // increment time
    this.currentTime += timeSince;
    this.timeThen = timeNow;
    this.currentTime = _.max([this.currentTime, 0.0]);
    this.currentTime = _.min([this.currentTime, this.endTime]);

    _.each(this.sequence, function(step, i){
      // starting, active
      if (_this.currentTime >= step.start && _this.currentTime < step.end) {
        if (step.state===INACTIVE) {
          _this.sequence[i].state = STARTING;
        } else {
          _this.sequence[i].state = ACTIVE;
        }

      // ending
      } else if (step.state===ACTIVE || step.state===STARTING) {
        _this.sequence[i].state = ENDING;

      // inactive
      } else {
        _this.sequence[i].state = INACTIVE;
      }
    });

    // render current frame
    this.render();

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

  Bisbee.prototype.render = function(){
    var _this = this;

    // timecode
    if (this.debug) {
      $('#debug-time').text(utils.formatTime(this.currentTime));
      $('#debug-speed').text(utils.round(this.direction*this.speed,2)+'x');
    }

    // update character
    this.renderCharacter();

    var started = 0,
        ended = 0;

    _.each(this.sequence, function(step, i){
      switch(step.state) {

        case INACTIVE:
          step.off(_this);
          break;

        case ACTIVE:
          var progress = (_this.currentTime-step.start)/(step.end-step.start);
          if (_this.debug) {
            $('#debug-scene').text(step.name);
            $('#debug-progress').text(Math.round(progress*100)+'%');
          }
          step.onProgress(progress, _this);
          break;

        case STARTING:
          if (_this.direction < 0) {
            step.onEnd(_this);
          } else {
            step.onStart(_this);
          }
          started++;
          break;

        case ENDING:
          if (_this.direction < 0) {
            step.onStart(_this);
          } else {
            step.onEnd(_this);
          }
          ended++;
          break;

      }
    });

    if (this.debug && (started || ended)) {
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    }

  };

  Bisbee.prototype.renderCharacter = function(){
    // character animation
    if (this.speedPercent > 0.5) {
      $('#character').removeClass('slow').addClass('walking fast');
    } else if (this.speedPercent > 0.25){
      $('#character').removeClass('slow fast').addClass('walking');
    } else if (this.speedPercent > 0){
      $('#character').removeClass('fast').addClass('walking slow');
    } else {
      $('#character').removeClass('walking fast slow');
    }

    // character audio
    if (this.speedPercent > 0.5) {
      this.mediaPause('footsteps');
      this.mediaPlay('footsteps-fast');
    } else if (this.speedPercent > 0) {
      this.mediaPause('footsteps-fast');
      this.mediaPlay('footsteps');
    } else {
      this.mediaPause(['footsteps', 'footsteps-fast']);
    }
  };

  Bisbee.prototype.reset = function(){
    var _this = this;

    if (this.debug) {
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    }

    this.currentTime = 0;

    _.each(this.sequence, function(step, i){
      _this.sequence[i].state = INACTIVE;
    });

    this.render();
  };

  return Bisbee;

})();

// Load app on ready
$(function() {
  var app = new Bisbee({
    sequence: BisbeeSequence
  });
});
