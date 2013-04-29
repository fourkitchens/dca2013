;(function($){
	$(document).ready(function(){
    $('.submitted .session')
      // hide description by default
      .find('.desc').addClass('collapsed')
      // toggle descriptions when you click title
      .parent().find('h2').click(function(){
        $(this).parent().find('.desc').toggleClass('collapsed');
        return false;
      });
  });
})(jQuery);
