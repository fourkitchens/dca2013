;(function($){
	$(document).ready(function(){
    $('.submitted .session')
      // find description
      .find('.desc')
      // toggle descriptions when you click title
      .parent().find('h3.title').click(function(){
        $(this).parent().find('.desc').toggleClass('expanded');
        return false;
      });
  });
})(jQuery);
