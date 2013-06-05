/*
 * Thanks to a11yproject.com for teh contrib codez
 * This is a function to populate our page of contributors
 */
(function($){
  $(document).ready(function(){
    $('#contributors-list').each(function(){

      // DCA contributor JSON from GitHub
      var url = 'https://api.github.com/repos/fourkitchens/dca2013/contributors';

      // Fetch the contributor list and fire the above function
      $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(data){
          listContributors(data.data);
        },
        error: function(e) {
          console.log(e.message);
        }
      });

      // Populate contributors list
      function listContributors(data) {
        // Our final markup
        var html = '';

        // For each contributor, build a little avatar link
        $(data).each(function(i, user){
          html += '<li><a href="'+ user.url.replace('api.','').replace('users/','') +'"><img src="'+ user.avatar_url +'" alt="'+ user.login +'" class="contributor-avatar"></a></li>';
        });

        // Insert data
        $('#contributors-list').append(html);
      }
    });
  });
})(jQuery);
