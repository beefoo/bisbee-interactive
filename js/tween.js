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

  in: function (p, pause, easing_function) {
    easing_function = easing_function || 'easeInQuint';

    return Easing[easing_function](p);
  },

  none: function(p){
    return 1;
  },

  tween: function(animate, t){
    _.each(animate, function(a, i){
      var value = utils.lerp(a.start, a.end, t);
      a.$el.css(a.prop, value + a.unit);
    });
  }
}
