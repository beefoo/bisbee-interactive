var Bisbee = {
  views: {},
  media: {},
  sequences: {},
  player: {},
  initialize: function(){
    var data = config;

    // Initialize each sequence
    $('.sequence').each(function(){
      var $el = $(this);
      var seq_data = {
        $el: $el,
        name: $el.attr('data-name'),
        order: parseInt($el.attr('data-order')),
        controls: $el.attr('controls'),
        character: $el.attr('character')
      };
      Bisbee.sequences[seq_data.name] = new BisbeeSequence($.extend({},data,seq_data));
    });

    Bisbee.media = new BisbeeMedia(data);
    Bisbee.player = new BisbeePlayer(data);

    Bisbee.views.character = new BisbeeCharacterView(data);
    Bisbee.views.stage = new BisbeeStageView(data);
    Bisbee.views.director = new BisbeeDirectorView(data);
  }
};

// Load app on ready
$(function() {
  Bisbee.initialize();
});
