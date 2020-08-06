var database = new Database();

var logIn, signUp, logOut, greeting;
var popupContainer, popup, closePopup;
var meetupSlide, cards, cardTemplate, meetups;
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
  cardTemplate = await (await fetch(`..${
    window.location.href == 'https://gunnpeeps.github.io/meetups/' ? '/meetups' : ''
    }/Templates/meetup-card.html`)).text();

  showPopup = function (template, obj) {
    popupContainer.fadeOut(() => popupTarget.html(Mustache.render(template, obj)));
    popupContainer.fadeIn();
    closePopup.click(() => popupContainer.fadeOut());
  };

  signIn();

  firebase.auth().onAuthStateChanged(async function (user) {

    if (user && user.emailVerified) {

      meetups = await database.getAllMeetups();
      for (let meetup of meetups) {
        cards
          .hide()
          .append(Mustache.render(cardTemplate, { "data": meetup.data(), "id": meetup.id }))
          .fadeIn();
      }

      showHide = $(".log-in-show-hide");
      input = cards.find("input");
      dateTimeInput = cards.find("input[type='date'],input[type='time']");
      textInput = $("input[type='text']");

      logIn.hide();
      signUp.hide();
      logOut.show();
      greeting.text(`Hello, ${user.displayName}!`).show();

      $(".card-title").change(function () {
        database.updateMeetup(
          $(this).parents(".meetup-card")[0].id,
          { title: $(this).val() }
        );
      });

      $(".card-date").change(function () {
        database.updateMeetup(
          $(this).parents(".meetup-card").first().id,
          {
            title: $(this).val()
          }
        );
      });

      const editors = await database.getEditors();
      if (editors.includes(user.email.replace(/\./g, ''))) {

        cardsError.hide();
        showHide.show();
        dateTimeInput.removeClass("hide-icon");
        input.removeAttr("readonly");
        textInput.on('keydown', e => { if (e.which === 13) e.preventDefault(); });

      } else {

        cardsError.hide();
        showHide.hide();
        dateTimeInput.addClass("hide-icon");
        input.attr("readonly", "true");

      }
    } else {

      cards.fadeOut(function () {
        $(this).empty().show();
      });

      cardsError.text("Log in to see meetups").fadeIn();

      logIn.show();
      signUp.show();
      logOut.hide();
      greeting.hide();

    }

  });

});
