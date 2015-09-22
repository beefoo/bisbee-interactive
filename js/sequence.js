var BisbeeSequence = [
  {
    el: 'door-from-left',
    start: '0:02',
    end: '0:07',
    animate: {
      left: [-100, 50, '%']
    },
    off: function(b){},
    onStart: function(b){
      if (b.direction > 0) b.mediaPlay('door-in', true);
    },
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);
    },
    onEnd: function(b){}
  },{
    el: 'door-from-right',
    start: '0:08',
    end: '0:13',
    animate: {
      right: [-100, 50, '%']
    },
    off: function(b){},
    onStart: function(b){
      if (b.direction > 0) b.mediaPlay('door-in', true);
    },
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);
    },
    onEnd: function(b){}
  },{
    el: 'door-from-top',
    start: '0:14',
    end: '0:20',
    animate: {
      top: [-100, 50, '%']
    },
    off: function(b){},
    onStart: function(b){
      if (b.direction > 0) b.mediaPlay('door-down', true);
    },
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);
    },
    onEnd: function(b){}
  }
];
