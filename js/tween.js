var BisbeeTween = {
  // no easing, no acceleration
  inPauseOut: function (p, pause, easing_function) {
    easing_function = easing_function || 'easeInOutQuint';

    var a_dur = (1.0 - pause) * 0.5;

    if (p > 1.0-a_dur) {
      p = 1.0 - (p - (1.0-a_dur))/a_dur;

    } else if (p > a_dur) {
      p = 1.0;

    } else {
      p = p/a_dur;
    }

    return Easing[easing_function](p);
  },

  tween: function($el, animate, t){
    _.each(animate, function(values, key){
      var value = utils.lerp(values[0], values[1], t);
      $el.css(key, value + values[2]);
    });
  }
}
