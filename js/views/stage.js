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

  BisbeeStageView.prototype.changeRadioStation = function(){
    var $stations = $('.radio-station'),
        playing_i = 0,
        min_needle_percent = 30,
        max_needle_percent = 90,
        needle_step = (max_needle_percent - min_needle_percent) / $stations.length;

    $stations.each(function(i){
      var media = $(this)[0];

      if (media && media.playing && media.volume > 0) {
        playing_i = i;
        media.volume = 0;
      }
    });

    var play_next = playing_i + 1;
    if (play_next >= $stations.length) play_next = 0;
    var $next_station = $stations.eq(play_next);
    var volume = parseFloat($next_station.attr('volume')) || 1;
    var next_station = $next_station[0];
    next_station.volume = volume;
    if (!next_station.playing) next_station.play();
    $('#radio-needle').css('left', (play_next*needle_step+min_needle_percent) + '%');
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

    $.subscribe('stop-radio', function(e){
      _this.stopRadioStations();
    });

    $('.guide').on('click', function(e){
      e.preventDefault();
      _this.modalHide();
    });

    $('.trigger-popup').on('click', function(e){
      e.preventDefault();
      $('#' + $(this).attr('data-popup') ).addClass('active');
    });

    $('.popup').on('click', function(e){
      e.preventDefault();
      $(this).removeClass('active');
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

    $('#car-radio').on('click', function(e){
      e.preventDefault();
      _this.changeRadioStation();
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

  BisbeeStageView.prototype.stopRadioStations = function(){

    $('.radio-station').each(function(i){
      var media = $(this)[0];
      if (media) media.pause();
    });
  };

  return BisbeeStageView;

})();
