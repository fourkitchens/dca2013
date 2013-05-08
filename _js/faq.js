;(function($){
  $(document).ready(function(){
    // vars
    var faqs = [];
    var i = 0;

    // Fetch FAQs once to save cycles
    $('.faq').each(function(){
      // Tag it with a unique class
      $(this).addClass('faq-'+i);

      // collect data from markup
      faqs[i] = {
        q: $(this).find('.question').text(),
        a: $(this).find('.answer').text(),
        id: i++
      };
    });

    // insert search box
    $('.faqs').prepend('<input id="magic-search" type="text" placeholder="type to search">');
    $('#magic-search').focus();

    // Search code as user types. Does simple searching on each key press,
    // then shows/hides individual FAQs
    $('#magic-search').keyup(function(){

      // More vars
      var val = $(this).val().toLowerCase(),
          test = '';

      // Loop through data and see which ones match
      for(var x=0; x <= $(faqs).length-1; x++){

        // Moar vars!!!
        var thisFaq = faqs[x];
        var question = '';
        var answer = '';

        // flatten
        question = thisFaq.q.toString().toLowerCase();
        answer = thisFaq.a.toString().toLowerCase();

        // Filter this entry, then show/hide
        if ((question.indexOf(val)) >= 0 || (answer.indexOf(val) >= 0)) {
          $('.faq-'+(x)).show('fast');
        }
        else {
          $('.faq-'+(x)).hide('fast');
        }

      }
    });

    // Listen for [esc] key and clear search
    $(document).keyup(function(e){
      if (e.keyCode == 27) {
        $('#magic-search').val('').trigger('keyup');
      }
    });
  });
})(jQuery);