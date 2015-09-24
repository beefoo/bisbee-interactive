var BSUtils = {
  doClassNames: function(classNames, p){
    _.each(classNames, function(c, i){
      if (p.between(c.start, c.end) && !c.invert) c.$el.addClass(c.name);
      else c.$el.removeClass(c.name);
    });
  },
  playSounds: function(sounds, p, b){
    _.each(sounds, function(sound, i){
      sound.direction = sound.direction.constructor === Array ? sound.direction : [sound.direction];
      if ((b.direction > 0 && p > sound.p || b.direction < 0 && p < sound.p) && _.contains(sound.direction, b.direction) && !sound.played) {
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

var BisbeeSequenceStepDefaults = {
  tweenMethod: 'inPauseOut',
  pauseAmount: 0.1,
  animate: [],
  sounds: [],
  classNames: []
};

var BisbeeSequence = [
  {
    el: 'door-from-left',
    start: '0:02',
    end: '0:07',
    animate: [
      {prop: 'left', start: -100, end: 50, unit: '%'}
    ],
    sounds: [
      {name: 'door-in', p: 0.2, played: false, direction: [-1, 1]},
      {name: 'door-out', p: 0.7, played: false, direction: [-1, 1]}
    ],
    classNames: [
      {name: 'moving-horizontal', start: 0.3, end: 0.7, invert: true}
    ]
  },{
    el: 'door-from-right',
    start: '0:08',
    end: '0:13',
    animate: [
      {prop: 'right', start: -100, end: 50, unit: '%'}
    ],
    sounds: [
      {name: 'door-in', p: 0.2, played: false, direction: [-1, 1]},
      {name: 'door-out', p: 0.7, played: false, direction: [-1, 1]}
    ],
    classNames: [
      {name: 'moving-horizontal', start: 0.3, end: 0.7, invert: true}
    ]
  },{
    el: 'door-from-top',
    start: '0:14',
    end: '0:20',
    animate: [
      {prop: 'top', start: -100, end: 50, unit: '%'}
    ],
    sounds: [
      {name: 'door-in', p: 0.2, played: false, direction: [-1, 1]},
      {name: 'door-out', p: 0.7, played: false, direction: [-1, 1]},
      {name: 'door-open', p: 0.5, played: false, direction: 1}
    ],
    classNames: [
      {name: 'moving-vertical', start: 0.3, end: 0.7, invert: true},
      {name: 'open', start: 0.5, end: 1.0}
    ]
  }
];
