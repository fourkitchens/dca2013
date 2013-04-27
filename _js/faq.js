(function($){
  $(document).ready(function(){
    // vars
    var faqs = [];
    var i = 0;

    // Fetch FAQs once to save cycles
    $('.faq').each(function(){

      // collect data from markup
      faqs[i] = {
        q: $(this).find('.question').html(),
        a: $(this).find('.answer').html(),
        id: i++
      };

    });

    // insert search box
    $('.faqs').prepend('<input id="magic-search" type="text" placeholder="type to search">');
    $('#magic-search').focus();

    // Search code. Does simple searching on each key press,
    // then shows/hides individual FAQs
    $('#magic-search').keyup(function(){

      // More vars
      var val = $(this).val().toLowerCase(),
          test = '';

      // Loop through data and see which ones match
      for(var x=0; x <= $(faqs).length; x++){

        // Moar vars!!!
        var thisFaq = faqs[x];
        var question = '';
        var answer = '';

        // flatten
        question = thisFaq.q.toString().toLowerCase();
        answer = thisFaq.a.toString().toLowerCase();

        // Filter this entry, then show/hide
        if ((question.indexOf(val)) >= 0 || (answer.indexOf(val) >= 0)) {
          $('.views-row-'+(x+1)).show('fast');
        }
        else {
          $('.views-row-'+(x+1)).hide('fast');
        }

      }
    });
  });
})(jQuery);