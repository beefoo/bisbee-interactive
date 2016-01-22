// Bisbee character view
var BisbeeCharacterView = (function() {
  function BisbeeCharacterView(options) {
    var defaults = {};
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  BisbeeCharacterView.prototype.init = function(options){
    var _this = this;
    this.debug = options.debug;
  };

  BisbeeCharacterView.prototype.render = function(player){
    var direction = player.direction,
        speedPercent = player.speedPercent;

    // character direction
    if (direction >= 0) {
      $('#character, #ground-image').removeClass('reverse');
    } else {
      $('#character, #ground-image').addClass('reverse');
    }

    // character animation
    if (speedPercent > 0.5) {
      $('#character, #ground-image').removeClass('slow').addClass('walking fast');
    } else if (speedPercent > 0.25){
      $('#character, #ground-image').removeClass('slow fast').addClass('walking');
    } else if (speedPercent > 0){
      $('#character, #ground-image').removeClass('fast').addClass('walking slow');
    } else {
      $('#character, #ground-image').removeClass('walking fast slow reverse');
    }

    // character audio
    var footsound = 'footsteps';
    if (!$('#floor').hasClass('active')) {
      footsound = 'footsteps-road';
      Bisbee.media.pause(['footsteps', 'footsteps-fast']);
    } else {
      Bisbee.media.pause(['footsteps-road', 'footsteps-road-fast']);
    }

    if (speedPercent > 0.5) {
      Bisbee.media.pause(footsound);
      Bisbee.media.play(footsound+'-fast');
    } else if (speedPercent > 0) {
      Bisbee.media.pause(footsound+'-fast');
      Bisbee.media.play(footsound);
    } else {
      Bisbee.media.pause([footsound, footsound+'-fast']);
    }
  };

  return BisbeeCharacterView;

})();
