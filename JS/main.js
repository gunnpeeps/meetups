var database = new Database();

var logIn, signUp, logOut;
var popupContainer, popup, closePopup;
var cards, cardTemplate, meetups;
var showHide, input, dateTimeInput, textInput;

var showPopup;

$(async () => {

  logIn = $("#log-in"), signUp = $("#sign-up");
  logOut = $("#log-out");
  popupContainer = $("#popup-container");
  popup = popupContainer.find("#popup");
  popupTarget = popup.find("#popup-target");
  closePopup = popup.find("#close-popup");
  cards = $("#card-container");
  cardTemplate = await (await fetch("../Templates/meetup-card.html")).text();
  meetups = await database.getAllMeetups();
  showHide = $(".log-in-show-hide");
  input = $("#meetups-slide>input");
  dateTimeInput = input.find("input[type='date'],input[type='time']");
  textInput = input.find("input[type='text']");

  showPopup = function (template, obj) {
    popupContainer.fadeOut(() => popupTarget.html(Mustache.render(template, obj)));
    popupContainer.fadeIn();
    closePopup.click(() => popupContainer.fadeOut());
  };

  for (let meetup of meetups) {
    cards.append(Mustache.render(cardTemplate, meetup));
  }

  signIn();

});