// Bisbee stage view
var BisbeeDirectorView = (function() {
  function BisbeeDirectorView(options) {
    var defaults = {};
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  BisbeeDirectorView.prototype.init = function(options){

    this.debug = options.debug;

    // Load listeners
    this.loadListeners();
  };

  BisbeeDirectorView.prototype.introShow = function(){
    var _this = this;

    $('.start').removeClass('active');

    if (!Bisbee.player.sequence || !Bisbee.player.autoplay && Bisbee.sequences.intro) {
      Bisbee.player.setSequence(Bisbee.sequences.intro);
      Bisbee.player.setNormalSpeed();
    }

    $.publish('player-play', true);
  };

  BisbeeDirectorView.prototype.loadListeners = function(){
    var _this = this;

    $('#start').on('click', function(){
      if ($(this).hasClass('loading')) return false;
      if (!_this.started) {
        _this.started = true;
        _this.introShow();
      }
    });

    $.subscribe('loaded-required', function(e){
      $('#start').removeClass('loading');
    });

    $.subscribe('sequence-end', function(e, sequence) {

      // show modal after intro
      if (sequence.name=='intro') {
        $.publish('show-modal', true);
      }

      // show next sequence
      if (sequence.order) {
        var nextSequence = _.find(Bisbee.sequences, function(seq){ return seq.order == (sequence.order+1); });
        if (nextSequence) {
          Bisbee.player.setSequence(nextSequence);
        }
      }
    });

    $.subscribe('sequence-set', function(e, sequence){
      $('.sequence, .stage-controls, .character').removeClass('active');
      if (sequence.$el) {
        sequence.$el.addClass('active');
      }
      if (sequence.controls) {
        $('.stage-controls').addClass('active');
      }
      if (sequence.character) {
        $('.character').addClass('active');
      }
      if (_this.debug) {
        $('#debug-scene').text(sequence.name);
      }

    });
  };

  return BisbeeDirectorView;

})();
