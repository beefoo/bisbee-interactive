var BisbeeSequence = [
  {
    el: 'door-from-left',
    start: '0:02',
    end: '0:07',
    animate: {
      left: [-100, 50, '%']
    },
    played_door_in: false,
    played_door_out: false,
    off: function(b){
      this.played_door_in = false;
      this.played_door_out = false;
    },
    onStart: function(b){},
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);

      // classes
      if (p.between(0.3, 0.7)) this.$el.removeClass('moving-horizontal');
      else this.$el.addClass('moving-horizontal');

      // sounds
      var sound_delay = 0.2;
      if ((b.direction > 0 && p > sound_delay || b.direction < 0 && p < sound_delay) && !this.played_door_in) {
        this.played_door_in = true;
        b.mediaPlay('door-in', true);
      }
      if ((b.direction > 0 && p > (0.5+sound_delay) || b.direction < 0 && p < (0.5+sound_delay)) && !this.played_door_out) {
        this.played_door_out = true;
        b.mediaPlay('door-out', true);
      }
    },
    onEnd: function(b){}
  },{
    el: 'door-from-right',
    start: '0:08',
    end: '0:13',
    animate: {
      right: [-100, 50, '%']
    },
    played_door_in: false,
    played_door_out: false,
    off: function(b){
      this.played_door_in = false;
      this.played_door_out = false;
    },
    onStart: function(b){},
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);

      // classes
      if (p.between(0.3, 0.7)) this.$el.removeClass('moving-horizontal');
      else this.$el.addClass('moving-horizontal');

      // sounds
      var sound_delay = 0.2;
      if ((b.direction > 0 && p > sound_delay || b.direction < 0 && p < sound_delay) && !this.played_door_in) {
        this.played_door_in = true;
        b.mediaPlay('door-in', true);
      }
      if ((b.direction > 0 && p > (0.5+sound_delay) || b.direction < 0 && p < (0.5+sound_delay)) && !this.played_door_out) {
        this.played_door_out = true;
        b.mediaPlay('door-out', true);
      }
    },
    onEnd: function(b){}
  },{
    el: 'door-from-top',
    start: '0:14',
    end: '0:20',
    animate: {
      top: [-100, 50, '%']
    },
    played_door_in: false,
    played_door_out: false,
    played_door_open: false,
    off: function(b){
      this.played_door_in = false;
      this.played_door_out = false;
      this.played_door_open = false;
    },
    onStart: function(b){},
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);

      // classes
      if (p.between(0.3, 0.7)) this.$el.removeClass('moving-vertical');
      else this.$el.addClass('moving-vertical');

      var door_open_p = 0.5;
      if (p > door_open_p) this.$el.addClass('open');
      else this.$el.removeClass('open');

      // sounds
      var sound_delay = 0.2;
      if ((b.direction > 0 && p > sound_delay || b.direction < 0 && p < sound_delay) && !this.played_door_in) {
        this.played_door_in = true;
        b.mediaPlay('door-in', true);
      }
      if ((b.direction > 0 && p > (0.5+sound_delay) || b.direction < 0 && p < (0.5+sound_delay)) && !this.played_door_out) {
        this.played_door_out = true;
        b.mediaPlay('door-out', true);
      }
      if (b.direction > 0 && p > door_open_p && !this.played_door_open) {
        this.played_door_open = true;
        b.mediaPlay('door-open', true);
      }
    },
    onEnd: function(b){}
  }
];
