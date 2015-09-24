var BSUtils = {
  playSounds: function(sounds, p, b){
    _.each(sounds, function(sound, i){
      if ((b.direction > 0 && p > sound.p || sound.reverse && b.direction < 0 && p < sound.p) && !sound.played) {
        sounds[i].played = true;
        b.mediaPlay(sound.name, true);
      }
    });
  },
  resetSounds: function(sounds){
    _.each(sounds, function(sound, i){
      sounds[i].played = false;
    });
  }
};

var BisbeeSequence = [
  {
    el: 'door-from-left',
    start: '0:02',
    end: '0:07',
    animate: {
      left: [-100, 50, '%']
    },
    sounds: [
      {name: 'door-in', p: 0.2, played: false, reverse: true},
      {name: 'door-out', p: 0.7, played: false, reverse: true}
    ],
    off: function(b){
      BSUtils.resetSounds(this.sounds);
    },
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);

      // classes
      if (p.between(0.3, 0.7)) this.$el.removeClass('moving-horizontal');
      else this.$el.addClass('moving-horizontal');

      // sounds
      BSUtils.playSounds(this.sounds, p, b);
    }
  },{
    el: 'door-from-right',
    start: '0:08',
    end: '0:13',
    animate: {
      right: [-100, 50, '%']
    },
    sounds: [
      {name: 'door-in', p: 0.2, played: false, reverse: true},
      {name: 'door-out', p: 0.7, played: false, reverse: true}
    ],
    off: function(b){
      BSUtils.resetSounds(this.sounds);
    },
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);

      // classes
      if (p.between(0.3, 0.7)) this.$el.removeClass('moving-horizontal');
      else this.$el.addClass('moving-horizontal');

      // sounds
      BSUtils.playSounds(this.sounds, p, b);
    }
  },{
    el: 'door-from-top',
    start: '0:14',
    end: '0:20',
    animate: {
      top: [-100, 50, '%']
    },
    sounds: [
      {name: 'door-in', p: 0.2, played: false, reverse: true},
      {name: 'door-out', p: 0.7, played: false, reverse: true},
      {name: 'door-open', p: 0.5, played: false, reverse: false}
    ],
    off: function(b){
      BSUtils.resetSounds(this.sounds);
    },
    onProgress: function(p,b){
      var t = BisbeeTween.inPauseOut(p, 0.1);
      BisbeeTween.tween(this.$el, this.animate, t);

      // classes
      if (p.between(0.3, 0.7)) this.$el.removeClass('moving-vertical');
      else this.$el.addClass('moving-vertical');

      if (p > 0.5) this.$el.addClass('open');
      else this.$el.removeClass('open');

      // sounds
      BSUtils.playSounds(this.sounds, p, b);
    }
  }
];
