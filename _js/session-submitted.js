(function($){
	$(document).ready(function(){
    $('.submitted .session')
      // find description
      .find('.desc')
      // toggle descriptions when you click title
      .parent()
      .find('h3.title')
      .click(function(e){
        e.preventDefault();
        $(this).parent().toggleClass('expanded');
      });

    $('.filters input').click(function(){
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
          $(this).removeClass('hidden');
        }
        else {
          $(this).addClass('hidden');
        }
      });
    });
  });
})(jQuery);
