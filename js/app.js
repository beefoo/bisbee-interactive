var Bisbee = {
  views: {},
  media: {},
  sequences: {},
  player: {},
  initialize: function(){
    var data = config;

    // TODO: read this from UI
    Bisbee.sequences.main = new BisbeeSequence($.extend({},data,{sequence: SequenceMain}));
    data.sequence = Bisbee.sequences.main;

    Bisbee.media = new BisbeeMedia(data);
    Bisbee.player = new BisbeePlayer(data);

    Bisbee.views.character = new BisbeeCharacterView(data);
    Bisbee.views.stage = new BisbeeStageView(data);

    // show debugger
    if (config.debug) $('.debug').removeClass('hide');
  }
};

// Load app on ready
$(function() {
  Bisbee.initialize();
});
