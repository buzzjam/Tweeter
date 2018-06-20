$(document).ready(function() {
  $('#tweetBox').on("keyup", function(){
    let letterCount = 140 - $(this).val().length;
    $('.counter').toggleClass('red', letterCount < 0);
    $('.counter').text(letterCount); 
  })
});