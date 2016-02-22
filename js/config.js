var config = {
  minSpeed: 0.5,
  maxSpeed: 2.0,
  aspectRatio: (1280/720),
  debug: true,
  sequenceStepDefaults: {
    tweenMethod: 'inPauseOut',
    pauseAmount: 0.2,
    type: 'scene',
    easingFunction: 'easeInQuint'
  }
};

// odometer config
window.odometerOptions = {
  auto: true, // Don't automatically initialize everything with class 'odometer'
  format: 'd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
};
