// Bisbee sequence
var BisbeeSequence = (function() {
  function BisbeeSequence(options) {
    var defaults = {};
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  BisbeeSequence.prototype.init = function(options){
    var _this = this;

    this.sequence = [];
    this.endTime = 0.0;
    this.debug = options.debug;
    this.name = options.name;
    this.order = options.order;
    this.controls = options.controls;
    this.character = options.character;

    // Load sequence
    if (options.$el) {
      this.loadSequenceFromEl(options.$el, options.sequenceStepDefaults);
    }
  };

  BisbeeSequence.prototype.getEndTime = function(){
    return this.endTime;
  };

  BisbeeSequence.prototype.getStartTime = function(){
    return this.startTime;
  };

  BisbeeSequence.prototype.loadSequence = function(sequence){
    var _this = this;

    this.sequence = [];

    _.each(sequence, function(_step, i){
      // apply defaults
      var step = $.extend({}, _step);
      step.id = i;
      step.el = step.$el.attr('id');
      step.name = step.el || 'Step ' + i;

      step.state = INACTIVE;
      // determine $els
      _.each(step.animations, function(a, i){
        step.animations[i].$el = step.$el;
      });
      _.each(step.classNames, function(c, i){
        step.classNames[i].$el = step.$el;
      });
      _this.sequence.push(step);
    });
  };

  BisbeeSequence.prototype.loadSequenceFromEl = function($el, defaults){
    var _this = this,
        sequence = [],
        sequence_start = utils.getSeconds($el.attr('start'), 1),
        sequence_end = utils.getSeconds($el.attr('end'), 1);

    this.$el = $el;
    this.startTime = sequence_start;
    this.endTime = sequence_end;

    // retrieve all scenes from sequence
    var $scenes = $el.children('.scene');
    $scenes.each(function(){
      var $scene = $(this);
      var scene = _this._getStep($scene, sequence_start, sequence_end, defaults);
      var scene_defaults = $.extend({}, scene);

      sequence.push(scene);

      var $objects = $scene.children('[start]');
      $objects.each(function(){
        var $object = $(this);
        var object = _this._getStep($object, scene.start, scene.end, scene_defaults);
        object.type = 'object';

        sequence.push(object);
      });
    });

    sequence = _.sortBy(sequence, 'start');
    this.loadSequence(sequence);
  };

  BisbeeSequence.prototype.onPause = function(player){
    this.render(player);
  };

  BisbeeSequence.prototype.onProgress = function(player){
    var _this = this,
        time = player.currentTime;

    _.each(this.sequence, function(step, i){
      // starting, active
      if (time >= step.start && time < step.end) {
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
    this.render(player);
  };

  BisbeeSequence.prototype.onReset = function(player){
    this.onProgress(player);
  };

  BisbeeSequence.prototype.render = function(player){
    var _this = this,
        started = 0,
        ended = 0,
        time = player.currentTime,
        speed = player.speed,
        direction = player.direction;

    // timecode
    if (this.debug) {
      $('#debug-time').text(utils.formatTime(time));
      $('#debug-speed').text(utils.round(direction*speed,2)+'x');
    }

    // render sequence steps
    _.each(this.sequence, function(step, i){
      switch(step.state) {

        case INACTIVE:
          _this.stepOff(_this.sequence[i]);
          break;

        case ACTIVE:
          _this.stepProgress(_this.sequence[i], player);
          break;

        case STARTING:
          if (direction < 0) {
            if (step.publish) $.publish('step.off.'+step.name, true);
          } else {
            if (step.publish) $.publish('step.on.'+step.name, true);
          }
          _this.stepProgress(_this.sequence[i], player);
          started++;
          break;

        case ENDING:
          if (direction < 0) {
            if (step.publish) $.publish('step.on.'+step.name, true);
          } else {
            if (step.publish) $.publish('step.off.'+step.name, true);
          }
          ended++;
          break;

      }
    });

    if (this.character)
      Bisbee.views.character.render(player);

  };

  BisbeeSequence.prototype.stepOff = function(step){
    step.$el.removeClass('active');
    BSUtils.resetSounds(step.sounds, Bisbee.media);
    step.off && step.off(this);
  };

  BisbeeSequence.prototype.stepProgress = function(step, player){
    var time = player.currentTime,
        progress = (time-step.start)/(step.end-step.start),
        tweenProgress = BisbeeTween[step.tweenMethod](progress, step.pauseAmount);

    // if (this.debug) {
    //   $('#debug-scene').text(step.name);
    //   $('#debug-progress').text(Math.round(progress*100)+'%');
    // }

    step.$el.addClass('active');
    BisbeeTween.tween(step.animations, tweenProgress);
    BSUtils.doClassNames(step.classNames, time);
    BSUtils.playSounds(step.sounds, time, player, Bisbee.media);
    step.onProgress && step.onProgress(progress, this);
  };

  BisbeeSequence.prototype._getAnimations = function($el){
    var animations = [],
        animation = {};

    // animate translation
    if ($el.hasClass('from-left') || $el.hasClass('from-right') || $el.hasClass('from-top') || $el.hasClass('from-bottom')) {
      animation = {
        prop: 'left',
        start: -100,
        end: 0,
        unit: '%'
      }
      if ($el.hasClass('from-right')) animation.prop = 'right';
      if ($el.hasClass('from-top')) animation.prop = 'top';
      if ($el.hasClass('from-bottom')) animation.prop = 'bottom';
      if ($el.attr('animation-start')) animation.start = parseFloat($el.attr('animation-start'));
      if ($el.attr('animation-end')) animation.end = parseFloat($el.attr('animation-end'));
      animations.push(animation);
    }

    // animate opacity
    if ($el.hasClass('from-fade')) {
      animation = {
        prop: 'opacity',
        start: 0,
        end: 1,
        unit: ''
      }
      if ($el.attr('animation-start')) animation.start = parseFloat($el.attr('animation-start'));
      if ($el.attr('animation-end')) animation.end = parseFloat($el.attr('animation-end'));
      animations.push(animation);
    }

    return animations;
  };

  BisbeeSequence.prototype._getSeconds = function($el, prop, start, end) {
    var str = $el.attr(prop);

    // empty; just inherit parent
    if (!str) {
      return prop.indexOf('start') > -1 ? start : end;

    // e.g. +0:02
    } else if (str.indexOf('+') > -1) {
      var seconds = utils.getSeconds(str.substring(1), 1);
      return start + seconds;

    // e.g. 0:10
    } else if (str.indexOf(':') > -1) {
      return utils.getSeconds(str, 1);

    // e.g. 2s
    } else if (str.indexOf('s') > -1) {
      var seconds = parseFloat(str);
      return start + seconds;

    // e.g. 0.2
    } else {
      var percent = parseFloat(str);
      return (end - start) * percent + start;

    }
  };

  BisbeeSequence.prototype._getStep = function($el, start, end, defaults){
    var _this = this,
        step = $.extend({}, defaults);

    step.$el = $el;
    step.start = this._getSeconds($el, 'start', start, end);
    if ($el.hasClass('publish')) step.publish = true;
    if ($el.attr('duration')) {
      step.end = step.start + utils.getSeconds($el.attr('duration'), 1);
    } else {
      step.end = this._getSeconds($el, 'end', start, end);
    }
    if ($el.attr('pause-amount')) step.pauseAmount = parseFloat($el.attr('pause-amount'));
    if ($el.attr('tween-method')) step.tweenMethod = $el.attr('tween-method');
    if ($el.attr('easing-function')) step.easingFunction = $el.attr('easing-function');

    // retrieve animations
    var animations = this._getAnimations($el);
    step.animations = animations;

    // retrieve sounds
    var $audios = $el.children('[audio]');
    step.sounds = [];
    $audios.each(function(){
      var $audio = $(this);
      var sound = {
        name: $audio.attr('audio'),
        loop: $audio.attr('loop'),
        direction: [-1, 1],
        played: false
      };

      // get direction
      var direction = $audio.attr('direction');
      if (direction == 'forward') sound.direction = 1;
      else if (direction == 'backward') sound.direction = -1;

      // get start
      sound.start = _this._getSeconds($audio, 'audio-start', step.start, step.end);

      step.sounds.push(sound);
    });

    // retrieve classNames
    var $toggles = $el.children('.toggle-class');
    step.classNames = [];
    $toggles.each(function(){
      var $toggle = $(this);
      var className = {
        name: $toggle.attr('toggle-name'),
        start: _this._getSeconds($toggle, 'toggle-start', step.start, step.end),
        end: _this._getSeconds($toggle, 'toggle-end', step.start, step.end),
        invert: $toggle.attr('toggle-invert')
      };

      step.classNames.push(className);
    });

    return step;
  };

  return BisbeeSequence;

})();
