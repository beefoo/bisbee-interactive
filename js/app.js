var Bisbee = {
  views: {},
  media: {},
  sequences: {},
  player: {},
  initialize: function(){
    var data = config;

    // Initialize each sequence
    $('.sequence').each(function(){
      var name = $(this).attr('data-name');
      Bisbee.sequences[name] = new BisbeeSequence($.extend({},data,{$el: $(this)}));
    });

    // Town is the first sequence
    data.sequence = Bisbee.sequences.town;

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
