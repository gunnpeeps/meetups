$(async function () {

  // Variables
  var cards = $("#card-container");
  var template = await (await fetch("../Templates/meetup-card.html")).text();

  // Create on website
  $.getJSON("./meetups.json", meetups => {
    for (let meetup of meetups) {
      for (let i = 1; i < meetup.periods.length; i++) {
        meetup.periods[i].start = meetup.periods[i - 1].end;
      }
      cards.append(Mustache.render(template, meetup));
    }
  });

});