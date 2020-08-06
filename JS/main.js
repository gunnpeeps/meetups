var database = new Database();

var logIn, signUp, logOut, greeting;
var popupContainer, popup, closePopup;
var meetupSlide, cards, meetups;
var showHide, input, dateTimeInput, textInput;

var showPopup;

$(async () => {

  logIn = $("#log-in");
  signUp = $("#sign-up");
  logOut = $("#log-out");
  greeting = $("#user-greeting");

  popupContainer = $("#popup-container");
  popup = popupContainer.find("#popup");
  popupTarget = popup.find("#popup-target");
  closePopup = popup.find("#close-popup");

  meetupSlide = $("#meetups-slide");
  cardsError = meetupSlide.find("#cards-error");
  cards = meetupSlide.find("#card-container");

  showPopup = function (template, obj) {
    popupContainer.fadeOut(() => popupTarget.html(Handlebars.compile(template)(obj)));
    popupContainer.fadeIn();
    closePopup.click(() => popupContainer.fadeOut());
  };

  signIn();

  firebase.auth().onAuthStateChanged(user => authChanged(user));

});
