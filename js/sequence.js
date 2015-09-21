var BisbeeSequence = [
  {
    el: 'door-from-left',
    start: '0:02',
    end: '0:06',
    animate: {
      left: [-100, 50, '%']
    },
    off: function(b){},
    onStart: function(b){},
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.2);
      BisbeeTween.tween(this.$el, this.animate, t);
    },
    onEnd: function(b){}
  },{
    el: 'door-from-right',
    start: '0:07',
    end: '0:11',
    animate: {
      right: [-100, 50, '%']
    },
    off: function(b){},
    onStart: function(b){},
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.2);
      BisbeeTween.tween(this.$el, this.animate, t);
    },
    onEnd: function(b){}
  },{
    el: 'door-from-top',
    start: '0:12',
    end: '0:16',
    animate: {
      top: [-100, 50, '%']
    },
    off: function(b){},
    onStart: function(b){},
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.2);
      BisbeeTween.tween(this.$el, this.animate, t);
    },
    onEnd: function(b){}
  }
];
