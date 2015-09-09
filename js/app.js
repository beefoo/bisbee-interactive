// Bisbee app
var Bisbee = (function() {
  function Bisbee(options) {
    var defaults = {};
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  Bisbee.prototype.init = function(options){
    var _this = this;

    this.sequence = [];
    this.speed = 1.0;
    this.endTime = 0.0;

    if (options.sequence) {
      this.loadSequence(options.sequence);
      if (this.sequence.length)
        this.endTime = this.sequence[this.sequence.length-1]['end'];
    }

    this.reset()
    this.loadListeners();
  };

  Bisbee.prototype.loadListeners = function(){
    var _this = this;

    $(window).keydown(function(e){
      switch(e.keyCode) {

        case 38: // up arrow
          e.preventDefault();
          _this.speed = 1.0;
          if (e.shiftKey) _this.speed = 2.0; // faster
          _this.play();
          break;

        case 40: // down arrow
          e.preventDefault();
          _this.speed = -1.0; // go in reverse
          if (e.shiftKey) _this.speed = -2.0; // faster
          _this.play();
          break;
      }
    });

    $(window).keyup(function(e){
      switch(e.keyCode) {
        case 38: // up arrow
        case 40: // down arrow
          e.preventDefault();
          _this.pause();
          break;
      }
    });

    $('.reset').on('click', function(){
      _this.reset();
    });
  };

  Bisbee.prototype.loadSequence = function(sequence){
    var _this = this;

    _.each(sequence, function(step, i){
      // parse seconds
      step.id = i;
      step.start = utils.getSeconds(step.start);
      step.end = utils.getSeconds(step.end);

      _this.sequence.push(step);
    });
  };

  Bisbee.prototype.pause = function(){
    this.playing = false;
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
        timeSince = (timeNow - this.timeThen)/1000 * this.speed;

    // increment time
    this.currentTime += timeSince;
    this.timeThen = timeNow;

    // determine which steps of sequence are active
    var activeSteps = _.filter(this.sequence, function(step){
      return _this.currentTime >= step.start && _this.currentTime < step.end;
    });
    var activeStepIds = _.pluck(activeSteps, 'id');
    var previousStepIds = _.pluck(this.previousSteps, 'id');

    // determine which steps were not in previous or no longer active
    this.startedSteps = _.filter(activeSteps, function(step){ return _.indexOf(previousStepIds, step.id) < 0;});
    this.endedSteps = _.filter(this.previousSteps, function(step){ return _.indexOf(activeStepIds, step.id) < 0;});
    this.previousSteps = activeSteps;

    // render current frame
    this.render();

    // reached the end
    if (this.currentTime >= this.endTime && this.speed > 0) {
      console.log('Reached End');
      this.pause();
      this.currentTime = this.endTime;

    // reached beginning (from reverse)
    } else if (this.currentTime <= 0 && this.speed < 0) {
      console.log('Reached Start');
      this.pause();
      this.currentTime = 0;

    // next frame if playing
    } else if (this.playing) {
      window.requestAnimationFrame(function(){_this.progress();});
    }
  };

  Bisbee.prototype.render = function(){
    var _this = this;

    $('#time').text(utils.formatTime(this.currentTime));

    // end steps
    _.each(this.endedSteps, function(step, i){
      if (_this.speed < 0) {
        step.onStart(_this);
      } else {
        step.onEnd(_this);
      }
    });

    // start steps
    _.each(this.startedSteps, function(step, i){
      if (_this.speed < 0) {
        step.onEnd(_this);
      } else {
        step.onStart(_this);
      }
    });

    // active steps
    _.each(this.previousSteps, function(step, i){
      step.onProgress(_this);
    });

  };

  Bisbee.prototype.reset = function(){
    var _this = this;

    this.currentTime = 0;
    this.startedSteps = [];
    this.endedSteps = [];
    this.previousSteps = [];

    _.each(this.sequence, function(step, i){
      step.onReset(_this);
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
