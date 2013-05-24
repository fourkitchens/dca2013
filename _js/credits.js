// Thanks to a11yproject.com for teh contrib codez
(function($){
  // Function to populate our page of contributors
  function listContributors(data) {
    var html = '';
    $(data).each(function(i, user){
      html += '<li><a href="'+ user.url.replace('api.','').replace('users/','') +'"><img src="'+ user.avatar_url +'" alt="'+ user.login +'" class="contributor-avatar"></a></li>';
    });

    $(html).appendTo('#contributors-list');
  }

  // DCA contributor list
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
})(jQuery);