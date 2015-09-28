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

