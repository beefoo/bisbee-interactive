var BisbeeSequence = [
  {
    start: '0:05',
    end: '0:07',
    onReset: function(b){
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    },
    onStart: function(b){
      console.log('Starting #1');
      $('#debug-scene').text('Scene 1');
      $('#debug-progress').text('0%');
    },
    onProgress: function(b){
      $('#debug-scene').text('Scene 1');
      $('#debug-progress').text(Math.round((b.currentTime-this.start)/(this.end-this.start)*100)+'%');
    },
    onEnd: function(b){
      console.log('Ending #1');
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    }
  },{
    start: '0:07',
    end: '0:12',
    onReset: function(b){
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    },
    onStart: function(b){
      console.log('Starting #2');
      $('#debug-scene').text('Scene 2');
      $('#debug-progress').text('0%');
    },
    onProgress: function(b){
      $('#debug-scene').text('Scene 2');
      $('#debug-progress').text(Math.round((b.currentTime-this.start)/(this.end-this.start)*100)+'%');
    },
    onEnd: function(b){
      console.log('Ending #2');
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    }
  },{
    start: '0:15',
    end: '0:35',
    onReset: function(b){
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    },
    onStart: function(b){
      console.log('Starting #3');
      $('#debug-scene').text('Scene 3');
      $('#debug-progress').text('0%');
    },
    onProgress: function(b){
      $('#debug-scene').text('Scene 3');
      $('#debug-progress').text(Math.round((b.currentTime-this.start)/(this.end-this.start)*100)+'%');
    },
    onEnd: function(b){
      console.log('Ending #3');
      $('#debug-scene').text('--');
      $('#debug-progress').text('--');
    }
  }
];
