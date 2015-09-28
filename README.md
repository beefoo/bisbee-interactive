# Bisbee Interactive

This is a web-based interactive app written entirely in HTML5, CSS3 (via SCSS), and Javascript

## Setup

This app is all static content, so it is very simple to set up locally or on any server. Simply clone the repository and open [index.html](https://github.com/beefoo/bisbee-interactive/blob/master/index.html) in a browser.

If you want to edit the styles, you will need to have [Sass installed](http://sass-lang.com/install). And run this command:

```
cd bisbee-interactive
sass --watch scss:css --style compressed
```

This will watch the `scss` folder for changes and automatically updated the css in `css` folder.

## Overview of files/file structure

- This is a one-page app. All HTML elements can be found in one file: [index.html](https://github.com/beefoo/bisbee-interactive/blob/master/index.html)
- [js/app.js](https://github.com/beefoo/bisbee-interactive/blob/master/js/app.js) is the main javascript file that controls the app.
- [js/sequence.js](https://github.com/beefoo/bisbee-interactive/blob/master/js/sequence.js) contains all the logic/config for the animation sequence itself
- All styles are found in the [scss](https://github.com/beefoo/bisbee-interactive/tree/master/scss) folder.
- Assets (images, video, audio) can be found in the `img`, `video`, and `audio` folder respectively

## Adding to or modifying the sequence

In [js/sequence.js](https://github.com/beefoo/bisbee-interactive/blob/master/js/sequence.js), there is a variable called `BisbeeSequence` that contains the logic for the overall sequence.

A simple example of a step in the sequence looks something like this:
 ```javascript
 {
  el: 'fence',
  start: '0:28.2',
  end: '0:39.6',
  animate: [
    {prop: 'right', start: -100, end: 0, unit: '%'}
  ]
}
```

- `el: 'fence'` defines the element that this step controls, in this case, the element with `id="fence"`
- `start` and `end` defines the start and end of this step in the animation in the format h:mm:ss. The seconds could have a decimal point to the tenth of a second.
- `animate` is a list of properties that will animate over this step in the sequence.
  - `prop` is the css property to be controlled
  - `start` and `end` are the start and end values that will be animated over
  - `unit` is the values' unit (e.g. px, %, em)

In this example, the element with id `fence` will have its `right` css property animated between -100% and 0% starting at 0:28.2 and ending at 0:39.6. It will look like it is sliding in from the right, then slide back out.

A more complex example may look like this:

```javascript
{
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
}
```

In addition to the properties described in the previous simple example:

- `pauseAmount: 0.1` defines how long the element should pause when it reaches the peak of its animation. In this example, we want the door to drop down, pause, then go back up. By default, `pauseAmount` is set to `0.2` which means it will pause for 20% of the total duration of that step.  In this example, we set it to `0.1` which means 10% of the total duration (10% of 9 seconds = 0.9 seconds)
- `sounds` is a list of sounds that should play during this step in the sequence
  - `name` is the name of the audio element.  All audio must be embedded in the `index.html` file. In this example, the name `door-in` refers to the audio element: `<audio data-id="door-in" src="audio/whoosh_in_lotr.mp3" preload="auto"></audio>`
  - `p` refers to the percentage of the step's duration at which the sound should play. In this example, `door-in` plays 20% in, the `door-open` plays 50% in, and `door-out` plays 70% through.
  - `direction` indicates the valid directions the sound is allowed to play in. For example, `[-1, 1]` means the sound can play when the sequence is playing forward or in reverse. A value of `1` indicates that the sound could only play when the sequence is in the forward direction. `-1` means the sound is only valid when sequence is playing in reverse.
- `classNames` is a list of instructions for adding/removing class names to the step's element(s)
  - `name` is the name of the class
  - `start` and `end` are the start and end percentages the class should be added between. In this example, the element with `id="door-from-top"` will have the class `open` between when the step is 50% complete and 100% complete.
  - `invert` indicates if the logic should be flipped. In this example, the element has the class `moving-vertical` when the percent progress is _not_ between 30% and 70%.
