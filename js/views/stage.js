// Bisbee stage view
var BisbeeStageView = (function() {
  function BisbeeStageView(options) {
    var defaults = {};
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  BisbeeStageView.prototype.init = function(options){

    this.aspectRatio = options.aspectRatio;
    this.debug = options.debug;

    // Adjust aspect ratio
    this.adjustAspectRatio();

    // Load listeners
    this.loadListeners();

    // Init odometer
    this.loadOdometer();

    // show debugger
    if (this.debug) $('.debug').removeClass('hide');
  };

  BisbeeStageView.prototype.adjustAspectRatio = function(){
    var windowHeight = $(window).height(),
        windowWidth = $(window).width(),
        w = windowWidth, h = windowHeight,
        l = 0, t = 0, ml = 0, mt = 0;

    // Portrait
    if (windowHeight > windowWidth) {
      w = h * this.aspectRatio;
      l = '50%';
      ml = -(w/2) + 'px';

    // Landscape
    } else {
      h = w / this.aspectRatio;
      t = '50%';
      mt = -(h/2) + 'px';
    }

    $('#stage').css({
      'width': w,
      'height': h,
      'left': l,
      'top': t,
      'margin-left': ml,
      'margin-top': mt
    });

  };

  BisbeeStageView.prototype.loadListeners = function(){
    var _this = this;

    $('.show-modal').on('click', function(e){
      e.preventDefault();
      _this.modalShow();
    });

    $.subscribe('show-modal', function(e){
      _this.modalShow();
    });

    $('.guide').on('click', function(e){
      e.preventDefault();
      _this.modalHide();
    });

    $('.hotspot').on('mouseover', function(e){
      _this.onHotspot($(this), e.clientY);
    });

    $('.hotspot').on('mousemove', function(e){
      _this.onHotspot($(this), e.clientY);
    });

    $('.hotspot').on('mouseout', function(){
      _this.offHotspot();
    });

    $(window).on('resize', function(){
      _this.adjustAspectRatio();
    });
  };

  BisbeeStageView.prototype.loadOdometer = function(){
    var _this = this,
        $odometer = $('#odometer');

    setTimeout(function(){
      var val = parseInt($odometer.attr('value')) + 1;
      $odometer.attr('value', val);
      $odometer.text(val);
      _this.loadOdometer();
    }, 2000);
  };

  BisbeeStageView.prototype.modalHide = function(){
    var _this = this;

    $('.modal').removeClass('active');
    setTimeout(function(){
      Bisbee.media.play('curtain-closing', true);
    }, 500);
    Bisbee.media.pause('crickets-bark');
    setTimeout(function(){
      $('.modal').addClass('hide');
    }, 4000);
  };

  BisbeeStageView.prototype.modalShow = function(){
    $('.modal').removeClass('hide').addClass('active');
    if (Bisbee.player.getCurrentTime() > 0) {
      $('.modal .guide-confirm').addClass('active');
    } else {
      $('.modal .guide-confirm').removeClass('active');
    }
    Bisbee.media.play(['curtain-opening', 'crickets-bark']);
  };

  BisbeeStageView.prototype.offHotspot = function(){
    $.publish('player-pause', true);
  };

  BisbeeStageView.prototype.onHotspot = function($hotspot, y){
    var hHeight = $hotspot.height(),
        yDelta = $hotspot.hasClass('top') ? hHeight + $hotspot.offset().top - y : y - $hotspot.offset().top,
        percent = yDelta / hHeight,
        direction = 1;

    if ($hotspot.hasClass('bottom')) {
      direction = -1;
    }

    if (percent > 0.5) {
      $hotspot.addClass('fast');
    } else {
      $hotspot.removeClass('fast');
    }

    $.publish('direction-change', direction);
    $.publish('speed-change', percent);
    $.publish('player-play', true);
  };

  return BisbeeStageView;

})();
