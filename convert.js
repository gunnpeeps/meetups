$(function () {

  // Variables
  var cards = $("#card-container");

  // Create on website
  $.getJSON("./meetups.json", function (meetups) {
    cards.append(Mustache.render($("#meetup-card-template").html(), { "meetups": meetups }));
  });

});