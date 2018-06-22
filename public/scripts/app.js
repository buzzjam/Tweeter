/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement (data){
  var HTMLoutput = 
    `<article class="tweetFeed">
      <header>
        <img class="avatar" src=${data.user.avatars.regular}>
        <span class="name">${data.user.name}</span>
        <span class="handle">${data.user.handle}</span>
      </header>

      <article class="actualTweet">
        ${escape(data.content.text)}
      </article>

      <footer>
        <span class="date">${moment(data.created_at).fromNow()}</span>
        <span class="hideFeatures">
          <input type="image" class = "hoverButtons" name = "flag" src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/web-pict-50.png">
          <input type="image" class = "hoverButtons" name = "retweet"  src="http://simpleicon.com/wp-content/uploads/retweet.png">
          <input type="image" class = "hoverButtons" name = "heart"  src="https://png.icons8.com/metro/1600/hearts.png">
        </span>
      </footer>
    </article>`
  return $(HTMLoutput);
}

function renderTweets(tweets) {
  tweets.forEach(function(element){
    $('#tweets-container').prepend(createTweetElement(element))
  })
}

function tweetButton(){
  $('#tweetForm').on('submit', function (event) {
    event.preventDefault();
    let inputLength = ($('#tweetBox').val().length)
    if (inputLength === 0){
      $('#noInput').show();
      $('#tooLong').hide();
      return;
    } if (inputLength > 140){

        $('#tooLong').show();
        $('#noInput').hide();
        return;
    } else {
      $('#noInput').hide();
      $('#tooLong').hide();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        error: function() {
        }
      }).then(function(){
        return $.ajax({
          url: '/tweets',
          method: 'GET'
        })
      }).then(function(json){
        $('#tweetBox').val('');
        $('#counter').html("140");
        $(createTweetElement(json[json.length - 1])).insertAfter(".new-tweet");
      });
    }
  });
}

function loadTweets (){
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(function(jsonContent){
        renderTweets(jsonContent);
    });
}

function toggleCompose(){
  $('#composeButton').on('click', function () {
    $(".new-tweet").slideToggle(200, function(){
      $("#tweetBox").focus();
    });
  });
};

$(document).ready(function() {
  tweetButton();
  loadTweets();
  toggleCompose()
});