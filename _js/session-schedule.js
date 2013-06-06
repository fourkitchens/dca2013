(function($){

  // Set up track filters
  $('.schedule .f-track input').click(function(){
    var tracks = [];

    if ($(this).is(':checked')) {
      $(this).parent().addClass('active');
    }
    else {
      $(this).parent().removeClass('active');
    }

    // gather filters
    $('.f-track input:checked').each(function(){
      tracks.push($(this).val());
    });

    // update display
    $('.session').each(function(){
      if ($.inArray($(this).data('track'),tracks) !== -1) { // || $.inArray($(this).data('difficulty'),diffs) !== -1
        $(this).removeClass('filtered');
      }
      else {
        $(this).addClass('filtered');
      }
    });
  });

  // Set up Reset button
  $('.schedule .f-reset button').click(function(){
    $('.schedule .filters input').not(':checked').click();
  });

})(jQuery);
