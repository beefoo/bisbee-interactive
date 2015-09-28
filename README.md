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

The simplest step in the sequence looks something like this:
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

In this example, the element with id `fence` will have its `right` css property animated between -100% and 0% (i.e. animated in from right) starting at 0:28.2 and ending at 0:39.6.
