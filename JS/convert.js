$(async function () {

  // Variables
  var cards = $("#card-container");
  var template = await (await fetch("../Templates/meetup-card.html")).text();
  var meetups = await database.getAllMeetups();

  // Create on website
  for (let meetup of meetups) {
    for (let i = 1; i < meetup.periods.length; i++) {
      meetup.periods[i].start = meetup.periods[i - 1].end;
    }
    cards.append(Mustache.render(template, meetup));
  }

});