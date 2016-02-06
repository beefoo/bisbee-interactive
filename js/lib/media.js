// Bisbee media
var BisbeeMedia = (function() {
  function BisbeeMedia(options) {
    var defaults = {};
    options = $.extend({}, defaults, options);
    this.init(options);
  }

  BisbeeMedia.prototype.init = function(options){

    this.media = {};
    this.debug = options.debug;

    // Load media
    this.loadMedia();
  };

  BisbeeMedia.prototype.loadMedia = function(){
    var _this = this;
        required = $('audio.required, video.required').length,
        loaded_required = 0;

    $('video, audio').each(function(){
      var $media = $(this),
          id = $media.attr('data-id');
      _this.media[id] = $media[0];
      // set volume
      if ($media.attr('volume')) {
        var volume = parseFloat($media.attr('volume'));
        _this.media[id].volume = volume;
      }
      if ($media.hasClass('required') || $media.attr('offset')) {
        _this.media[id].oncanplay = function(){
          // required to load
          if ($media.hasClass('required')) {
            loaded_required++;
            if (loaded_required >= required) {
              $.publish('loaded-required', true);
            }
          }
          // offset
          if ($media.attr('offset')) {
            _this.media[id].currentTime = parseFloat($media.attr('offset'));
          }
        };
      }
      // if (_this.debug) {
      //   var src = $(this)[0].src || $(this).children('source')[0].src;
      //   console.log('Loaded '+src);
      // }
    });

    if (required <= 0) $.publish('loaded-required', true);
  };

  BisbeeMedia.prototype.pause = function(ids, reset){
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

  BisbeeMedia.prototype.play = function(ids, reset){
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

  return BisbeeMedia;

})();
