var BisbeeSequence = [
  {
    start: '0:05',
    end: '0:07',
    onReset: function(b){$('#step1').text('0%');},
    onStart: function(b){console.log('Starting #1');},
    onProgress: function(b){
      $('#step1').text(Math.round((b.currentTime-this.start)/(this.end-this.start)*100)+'%');
    },
    onEnd: function(b){console.log('Ending #1');}
  },{
    start: '0:07',
    end: '0:12',
    onReset: function(b){$('#step2').text('0%');},
    onStart: function(b){console.log('Starting #2');},
    onProgress: function(b){
      $('#step2').text(Math.round((b.currentTime-this.start)/(this.end-this.start)*100)+'%');
    },
    onEnd: function(b){console.log('Ending #2');}
  },{
    start: '0:15',
    end: '0:35',
    onReset: function(b){$('#step3').text('0%');},
    onStart: function(b){console.log('Starting #3');},
    onProgress: function(b){
      $('#step3').text(Math.round((b.currentTime-this.start)/(this.end-this.start)*100)+'%');
    },
    onEnd: function(b){console.log('Ending #3');}
  }
];
