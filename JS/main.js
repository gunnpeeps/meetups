var database = new Database();

var popupContainer, popup, cards, cardTemplate, meetups, logIn, signUp, logOut;
var showPopup;

$(async () => {

  popupContainer = $("#popup-container");
  popup = popupContainer.find("#popup-target");
  cards = $("#card-container");
  cardTemplate = await (await fetch("../Templates/meetup-card.html")).text();
  meetups = await database.getAllMeetups();
  logIn = $("#log-in");
  signUp = $("#sign-up");
  signInButton = $("#log-in, #sign-up")
  logOut = $("#log-out");

  showPopup = async function (template, obj) {
    await popupContainer.fadeOut();
    popup.html(Mustache.render(template, obj));
    popupContainer.fadeIn();
    $("#close-popup").click(() => popupContainer.fadeOut());
  };

  for (let meetup of meetups) {
    cards.append(Mustache.render(cardTemplate, meetup));
  }

  signIn();

});