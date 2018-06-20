/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
        <span class="date">${data.created_at}</span>
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
    $('#tweets-container').append(createTweetElement(element))
  })
}

function tweetButton(){
  $('#tweetForm').on('submit', function (event) {
    event.preventDefault();
    let inputLength = ($('#tweetBox').val().length)
    if (inputLength === 0 || inputLength > 140){
      return $('#tweetBox').addClass('inputTxtError');
    } else {
      $('#tweetBox').removeClass('inputTxtError');
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        error: function() {
          $('#tweetBox').addClass('inputTxtError')
        }
      }).then(function(){
        return $.ajax({
          url: '/tweets',
          method: 'GET'
        })
      }).then(function(json){
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


// Test / driver code (temporary)
$(document).ready(function() {
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  // renderTweets(data);
  tweetButton();
  loadTweets();
});