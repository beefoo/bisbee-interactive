var BisbeeSequenceStepDefaults = {
  tweenMethod: 'inPauseOut',
  pauseAmount: 0.2,
  animate: [],
  sounds: [],
  classNames: []
};

var BisbeeSequence = [
  {
    el: 'door-from-left',
    start: '0:00',
    end: '0:06',
    pauseAmount: 0.1,
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
    start: '0:03',
    end: '0:11',
    pauseAmount: 0.1,
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
    start: '0:08',
    end: '0:17',
    pauseAmount: 0.1,
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
  },{
    el: 'ground',
    start: '0:13',
    end: '1:00',
    tweenMethod: 'none',
    animate: [
      {prop: 'opacity', start: 0, end: 1, unit: ''}
    ],
    onStart: function(){
      $('#floor').removeClass('active');
    },
    off: function(){
      $('#floor').addClass('active');
    }
  },{
    el: 'rock-02-from-right',
    start: '0:13',
    end: '0:33',
    animate: [
      {prop: 'right', start: -100, end: 0, unit: '%'}
    ]
  },{
    el: 'rock-01-from-left',
    start: '0:13',
    end: '0:24.6',
    animate: [
      {prop: 'left', start: -100, end: 0, unit: '%'}
    ],
    sounds: [
      {name: 'hot-day', p: 0.1, played: false, direction: [-1, 1], loop: true},
      {name: 'rocks-falling', p: 0.15, played: false, direction: [-1, 1]}
    ]
  },{
    el: 'rock-03-from-top',
    start: '0:14',
    end: '0:24.2',
    animate: [
      {prop: 'top', start: -100, end: 0, unit: '%'}
    ],
    sounds: [
      {name: 'rocks-falling', p: 0.6, played: false, direction: [-1, 1]}
    ]
  },{
    el: 'insects-videos',
    start: '0:16',
    end: '0:22',
    animate: [
      {el: 'ants-video', prop: 'opacity', start: 0, end: 1, unit: ''},
      {el: 'scorpion-video', prop: 'opacity', start: 0, end: 1, unit: ''}
    ],
    sounds: [
      {name: 'hot-day', p: 0.2, played: false, direction: [-1, 1], loop: true}
    ]
  },{
    el: 'car',
    start: '0:20',
    end: '0:40',
    animate: [
      {prop: 'top', start: -100, end: 50, unit: '%'}
    ],
    sounds: [
      {name: 'hot-day', p: 0.2, played: false, direction: [-1, 1], loop: true},
      {name: 'impressions', p: 0.2, played: false, direction: [-1, 1]},
      {name: 'rooster-crowing', p: 0.6, played: false, direction: [-1, 1]}
    ]
  },{
    el: 'rock-06-from-left',
    start: '0:21',
    end: '0:32',
    animate: [
      {prop: 'left', start: -100, end: 0, unit: '%'}
    ]
  },{
    el: 'tire',
    start: '0:21.2',
    end: '0:38',
    animate: [
      {prop: 'left', start: -100, end: 10, unit: '%'}
    ]
  },{
    el: 'rock-07-from-left',
    start: '0:21.4',
    end: '0:38.4',
    animate: [
      {prop: 'left', start: -100, end: 0, unit: '%'}
    ]
  },{
    el: 'rabbit',
    start: '0:21.6',
    end: '0:32.6',
    animate: [
      {prop: 'top', start: -100, end: 69, unit: '%'}
    ]
  },{
    el: 'ball',
    start: '0:21.8',
    end: '0:32.8',
    animate: [
      {prop: 'top', start: -100, end: 74, unit: '%'}
    ]
  },{
    el: 'frisbee',
    start: '0:22',
    end: '0:33',
    animate: [
      {prop: 'top', start: -100, end: 72, unit: '%'}
    ]
  },{
    el: 'tree-tire',
    start: '0:28',
    end: '0:39.8',
    animate: [
      {prop: 'left', start: -100, end: 22, unit: '%'}
    ]
  },{
    el: 'fence',
    start: '0:28.2',
    end: '0:39.6',
    animate: [
      {prop: 'right', start: -100, end: 0, unit: '%'}
    ]
  },{
    el: 'rock-08-from-right',
    start: '0:28.6',
    end: '0:39.4',
    animate: [
      {prop: 'right', start: -100, end: 0, unit: '%'}
    ]
  },{
    el: 'fence2',
    start: '0:28.8',
    end: '0:39.2',
    animate: [
      {prop: 'left', start: -100, end: 0, unit: '%'}
    ]
  },{
    el: 'house',
    start: '0:29',
    end: '0:39',
    animate: [
      {prop: 'top', start: -100, end: 0, unit: '%'}
    ]
  }
];
