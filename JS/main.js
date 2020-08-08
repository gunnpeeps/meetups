var locals = [
  "http://127.0.0.1:5500",
  "http://localhost"
];

var database = new Database();

var logIn, signUp, logOut, greeting;
var popupContainer, popup, closePopup;
var meetupSlide, cards;
var showHide, input, dateTimeInput, textInput;

var showPopup, loadMeetups;

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
    closePopup.on('click', () => popupContainer.fadeOut());
  };

  loadMeetups = async function () {

    showHide = $(".log-in-show-hide");
    input = cards.find("input");
    dateTimeInput = cards.find("input[type='date'],input[type='time']");
    textInput = $("input[type='text']");

    let resolvePromise;
    let loadPromise = new Promise((res, rej) => {
      resolvePromise = res;
    });

    const meetups = await database.getAllMeetups();
    const cardTemplate = Handlebars.compile(
      await (await fetch(`./Templates/meetup-card.html`)).text()
    );
    cards.fadeOut(() => {
      cards.empty();
      for (let meetup of meetups) {
        cards.append(cardTemplate(meetup));
      }
    }).fadeIn(() => {
      resolvePromise();
    });

    await loadPromise;

  }

  signIn();
  firebase.auth().onAuthStateChanged(user => authChanged(user));

});