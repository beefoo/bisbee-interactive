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
    animate: [{prop: 'left', start: -100, end: 50, unit: '%'}],
    sounds: [
      {name: 'door-in', p: 0.2, played: false, direction: [-1, 1]},
      {name: 'door-out', p: 0.7, played: false, direction: [-1, 1]}
    ],
    classNames: [{name: 'moving-horizontal', start: 0.3, end: 0.7, invert: true}]
  },{
    el: 'door-from-right',
    start: '0:03',
    end: '0:11',
    pauseAmount: 0.1,
    animate: [{prop: 'right', start: -100, end: 50, unit: '%'}],
    sounds: [
      {name: 'door-in', p: 0.2, played: false, direction: [-1, 1]},
      {name: 'door-out', p: 0.7, played: false, direction: [-1, 1]}
    ],
    classNames: [{name: 'moving-horizontal', start: 0.3, end: 0.7, invert: true}]
  },{
    el: 'door-from-top',
    start: '0:08',
    end: '0:17',
    pauseAmount: 0.1,
    animate: [{prop: 'top', start: -100, end: 50, unit: '%'}],
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
    end: '1:06',
    tweenMethod: 'none',
    animate: [{prop: 'opacity', start: 0, end: 1, unit: ''}],
    onStart: function(){
      $('#floor').removeClass('active');
    },
    off: function(){
      $('#floor').addClass('active');
    }
  },{
    el: 'rocks-rock2-from-right',
    start: '0:12',
    end: '0:33',
    animate: [{prop: 'right', start: -100, end: 0, unit: '%'}]
  },{
    el: 'rocks-rock1-from-left',
    start: '0:13',
    end: '0:25.6',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}],
    sounds: [
      {name: 'hot-day', p: 0.1, played: false, direction: [-1, 1], loop: true},
      {name: 'rocks-falling', p: 0.15, played: false, direction: [-1, 1]}
    ]
  },{
    el: 'rocks-rock3-from-top',
    start: '0:13',
    end: '0:25.2',
    animate: [{prop: 'top', start: -100, end: 0, unit: '%'}],
    sounds: [{name: 'rocks-falling', p: 0.6, played: false, direction: [-1, 1]}]
  },{
    el: 'ramshackle-bg',
    start: '0:14',
    end: '0:40',
    animate: [
      {prop: 'bottom', start: -100, end: 0, unit: '%'},
      {prop: 'opacity', start: 0, end: 1, unit: ''}
    ]
  },{
    el: 'rocks-insects-videos',
    start: '0:17',
    end: '0:22',
    animate: [
      {el: 'rocks-ants-video', prop: 'opacity', start: 0, end: 1, unit: ''},
      {el: 'rocks-scorpion-video', prop: 'opacity', start: 0, end: 1, unit: ''}
    ],
    sounds: [
      {name: 'hot-day', p: 0.2, played: false, direction: [-1, 1], loop: true}
    ]
  },{
    el: 'ramshackle-car',
    start: '0:20',
    end: '0:36',
    animate: [{prop: 'top', start: -100, end: 33, unit: '%'}],
    sounds: [
      {name: 'hot-day', p: 0, played: false, direction: [-1, 1], loop: true},
      {name: 'dia-impressions', p: 0.2, played: false, direction: [-1, 1]},
      {name: 'rooster-crowing', p: 0.6, played: false, direction: [-1, 1]}
    ]
  },{
    el: 'ramshackle-rock1-from-left',
    start: '0:21',
    end: '0:34.4',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}]
  },{
    el: 'ramshackle-tree-tire',
    start: '0:20.4',
    end: '0:34.8',
    animate: [{prop: 'left', start: -100, end: 25.5, unit: '%'}]
  },{
    el: 'ramshackle-tire',
    start: '0:20.2',
    end: '0:35',
    animate: [{prop: 'left', start: -100, end: 20, unit: '%'}]
  },{
    el: 'ramshackle-rock2-from-left',
    start: '0:20',
    end: '0:35.4',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}]
  },{
    el: 'ramshackle-rabbit',
    start: '0:21.6',
    end: '0:32.6',
    animate: [{prop: 'top', start: -100, end: 74.2, unit: '%'}]
  },{
    el: 'ramshackle-ball',
    start: '0:21.8',
    end: '0:32.8',
    animate: [{prop: 'top', start: -100, end: 80, unit: '%'}]
  },{
    el: 'ramshackle-plate',
    start: '0:22',
    end: '0:33',
    animate: [{prop: 'top', start: -100, end: 76, unit: '%'}]
  },{
    el: 'ramshackle-bedposts',
    start: '0:22.2',
    end: '0:33.6',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}]
  },{
    el: 'ramshackle-rock3-from-right',
    start: '0:22.6',
    end: '0:34.4',
    animate: [{prop: 'right', start: -100, end: 0, unit: '%'}]
  },{
    el: 'ramshackle-cacti',
    start: '0:22',
    end: '0:33',
    animate: [{prop: 'right', start: -100, end: 0, unit: '%'}]
  },{
    el: 'ramshackle-fence',
    start: '0:22.8',
    end: '0:31.2',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}]
  },{
    el: 'ramshackle-house',
    start: '0:23',
    end: '0:32',
    animate: [{prop: 'bottom', start: -100, end: 54, unit: '%'}]
  },{
    el: 'homes-hill-bg',
    start: '0:24',
    end: '0:56',
    animate: [
      {prop: 'bottom', start: -100, end: 0, unit: '%'},
      {prop: 'opacity', start: 0, end: 1, unit: ''}
    ]
  },{
    el: 'homes-mosaic',
    start: '0:30',
    end: '0:46',
    animate: [{prop: 'right', start: -100, end: 0, unit: '%'}],
    sounds: [
      {name: 'rooster-crowing', p: 0.2, played: false, direction: [-1, 1], loop: true},
      {name: 'dia-stairs', p: 0.2, played: false, direction: [-1, 1]}
    ]
  },{
    el:'homes-long-stairs-left',
    start: '0:30.5',
    end: '0:45.5',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}]
  },{
    el:'homes-stacked-left',
    start: '0:31',
    end: '0:45',
    animate: [{prop: 'left', start: -100, end: 13, unit: '%'}]
  },{
    el:'homes-sheds-house',
    start: '0:31.5',
    end: '0:44.5',
    animate: [{prop: 'right', start: -100, end: 0, unit: '%'}]
  },{
    el:'homes-cacti-fence',
    start: '0:32',
    end: '0:44',
    animate: [{prop: 'left', start: -100, end: 33, unit: '%'}]
  },{
    el:'homes-stairwell',
    start: '0:32.5',
    end: '0:43.5',
    animate: [{prop: 'right', start: -100, end: 20, unit: '%'}]
  },{
    el:'homes-foundation',
    start: '0:33',
    end: '0:43',
    animate: [{prop: 'right', start: -100, end: 30, unit: '%'}]
  },{
    el:'homes-shed',
    start: '0:33.5',
    end: '0:42.5',
    animate: [{prop: 'bottom', start: -100, end: 63, unit: '%'}]
  },{
    el:'homes-car-garage',
    start: '0:33.6',
    end: '0:42.4',
    animate: [{prop: 'top', start: -100, end: 58, unit: '%'}]
  },{
    el:'homes-car',
    start: '0:33.8',
    end: '0:42.2',
    animate: [{prop: 'top', start: -100, end: 65, unit: '%'}]
  },{
    el:'homes-house-top-left',
    start: '0:34',
    end: '0:42',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}]
  },{
    el:'homes-school-building',
    start: '0:34',
    end: '0:42',
    animate: [{prop: 'bottom', start: -100, end: 30, unit: '%'}]
  },{
    el: 'buildings-left',
    start: '0:38',
    end: '0:52',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}],
    sounds: [
      {name: 'amb-town', p: 0, played: false, direction: [-1, 1], loop: true},
      {name: 'dia-scared', p: 0.2, played: false, direction: [-1, 1]}
    ]
  },{
    el: 'buildings-right',
    start: '0:38.5',
    end: '0:51.5',
    animate: [{prop: 'right', start: -100, end: 0, unit: '%'}]
  },{
    el: 'buildings-graffiti',
    start: '0:39',
    end: '0:51',
    animate: [{prop: 'left', start: -100, end: 0, unit: '%'}]
  },{
    el: 'buildings-sign',
    start: '0:39.5',
    end: '0:50.5',
    animate: [{prop: 'bottom', start: -100, end: 4.5, unit: '%'}]
  },{
    el: 'buildings-cacti',
    start: '0:40',
    end: '0:50',
    animate: [{prop: 'bottom', start: -100, end: 0, unit: '%'}]
  },{
    el: 'buildings-plant',
    start: '0:40.5',
    end: '0:49.5',
    animate: [{prop: 'bottom', start: -100, end: 0, unit: '%'}]
  },{
    el: 'buildings-center',
    start: '0:41',
    end: '0:49',
    animate: [{prop: 'top', start: -100, end: 45, unit: '%'}]
  },{
    el: 'buildings-wires',
    start: '0:41.5',
    end: '0:48.5',
    animate: [{prop: 'top', start: -100, end: 0, unit: '%'}]
  },{
    el: 'pit-bg',
    start: '0:42',
    end: '1:10',
    animate: [{prop: 'opacity', start: 0, end: 1, unit: ''}]
  },{
    el: 'pit-mileage-sign',
    start: '0:46',
    end: '0:54',
    animate: [{prop: 'right', start: -100, end: 4.5, unit: '%'}],
    sounds: [
      {name: 'amb-pit', p: 0.2, played: false, direction: [-1, 1], loop: true},
      {name: 'dia-hitchhike', p: 0.8, played: false, direction: [-1, 1]}
    ]
  },{
    el: 'pit-sign-scenic',
    start: '0:48',
    end: '0:56',
    animate: [{prop: 'bottom', start: -100, end: 30, unit: '%'}]
  },{
    el: 'pit-pit',
    start: '0:50',
    end: '1:04',
    animate: [{prop: 'bottom', start: -100, end: 24, unit: '%'}]
  },{
    el: 'pit-barb-wire',
    start: '0:51',
    end: '0:59',
    animate: [{prop: 'right', start: -100, end: 0, unit: '%'}]
  },{
    el: 'pit-bisbee-sign',
    start: '0:54',
    end: '1:02',
    animate: [{prop: 'left', start: -100, end: 4.3, unit: '%'}]
  }
];
