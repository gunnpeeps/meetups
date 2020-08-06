async function authChanged(user) {
  if (user && user.emailVerified) {

    const cardTemplate = await (await fetch(`..${
      window.location.href == 'https://gunnpeeps.github.io/meetups/' ? '/meetups' : ''
      }/Templates/meetup-card.html`)).text();
    meetups = await database.getAllMeetups();
    for (let meetup of meetups) {
      cards
        .hide()
        .append(Handlebars.compile(cardTemplate)(meetup))
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

    const editors = await database.getEditors();
    if (editors.includes(user.email.replace(/\./g, ''))) {

      cardsError.hide();
      showHide.show();
      dateTimeInput.removeClass("hide-icon");
      input.removeAttr("readonly");
      textInput.on('keydown', e => { if (e.which === 13) e.preventDefault(); });

      $(".card-date, .card-title, .schedule-period>td>input").change(function () {
        const input = $(this);
        database.updateMeetup(
          input.parents(".meetup-card")[0].id,
          input.attr('class').split(' ')[1],
          input.val()
        );
      });

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
}