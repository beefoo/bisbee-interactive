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

    // Load sequence
    if (options.sequence) {
      this.loadSequence(options.sequence, options.sequenceStepDefaults);
      if (this.sequence.length)
        this.endTime = _.max(_.pluck(this.sequence, 'end'));
    }
  };

  BisbeeSequence.prototype.getEndTime = function(){
    return this.endTime;
  };

  BisbeeSequence.prototype.loadSequence = function(sequence, stepDefaults){
    var _this = this;

    this.sequence = [];

    _.each(sequence, function(_step, i){
      // apply defaults
      var step = _.extend({}, stepDefaults, _step);
      step.id = i;
      step.name = step.name || step.el || 'Step ' + i;
      step.state = INACTIVE;
      // parse seconds
      step.start = utils.getSeconds(step.start, 1);
      step.end = utils.getSeconds(step.end, 1);
      // determine $els
      if (step.el) step.$el = $('#'+step.el);
      _.each(step.animate, function(a, i){
        var el = a.el || step.el;
        step.animate[i].$el = $('#'+el);
      });
      _.each(step.classNames, function(c, i){
        var el = c.el || step.el;
        step.classNames[i].$el = $('#'+el);
      });
      _this.sequence.push(step);
    });
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
    _.each(this.sequence, function(step, i){
      _this.sequence[i].state = INACTIVE;
    });

    this.render(player);
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
            step.onEnd && step.onEnd(_this);
          } else {
            step.onStart && step.onStart(_this);
          }
          _this.stepProgress(_this.sequence[i], player);
          started++;
          break;

        case ENDING:
          if (direction < 0) {
            step.onStart && step.onStart(_this);
          } else {
            step.onEnd && step.onEnd(_this);
          }
          ended++;
          break;

      }
    });

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
    BisbeeTween.tween(step.animate, tweenProgress);
    BSUtils.doClassNames(step.classNames, progress);
    BSUtils.playSounds(step.sounds, progress, player, Bisbee.media);
    step.onProgress && step.onProgress(progress, this);
  };

  return BisbeeSequence;

})();
