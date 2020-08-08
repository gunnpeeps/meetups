async function authChanged(user) {

  if (user && user.emailVerified) {

    await loadMeetups();

    $(document).on('change', ".card-date, .card-title", function () {
      const input = $(this);
      database.updateMeetup(
        input.parents(".meetup-card")[0].id,
        input.attr('class').split(' ')[1],
        input.val()
      );
    });
    $(document).on('change', ".schedule-period>td>input", function () {
      console.log('hi');
      const input = $(this);
      database.updatePeriod(
        input.parents(".meetup-card")[0].id,
        this.id,
        input.attr('class').split('-')[1],
        input.val()
      );
    });

    cardsError.fadeOut();
    logIn.hide();
    signUp.hide();
    logOut.show();
    greeting.text(`Hello, ${user.displayName}!`).show();

    const editors = await database.getEditors();
    if (editors.includes(user.email.replace(/\./g, ''))) {

      showHide.show();
      dateTimeInput.removeClass("hide-icon");
      input.removeAttr("readonly");
      textInput.on('keydown', e => { if (e.which === 13) e.preventDefault(); });

      $("#add-meetup").on('click', async () => {
        await database.createMeetup();
        await loadMeetups();
      });
      $(".add-period").on('click', async function () {
        const obj = await database.createPeriod($(this).parents(".meetup-card")[0].id);
        $(this).siblings(".schedule-periods").append(Handlebars.compile(`
          <tr class="schedule-period">
            <td><input class="period-start" id="{{id}}" type="time" value="{{this.start}}"></td>
            <td class="dash">-</td>
            <td><input class="period-end" id="{{id}}" type="time" value="{{this.end}}"></td>
            <td><input class="period-activity" id="{{id}}" type="text" value="{{this.activity}}"></td>
          </tr>
        `)(obj));
      });

    } else {

      showHide.hide();
      dateTimeInput.addClass("hide-icon");
      input.attr("readonly", "true");

    }
  } else {

    cards.fadeOut(function () {
      $(this).empty().show();
    });

    cardsError.fadeOut(() => cardsError.text(
      user.emailVerified ? "Log in to see meetups" : "Verify your email to see meetups"
    )).fadeIn();

    logIn.show();
    signUp.show();
    logOut.hide();
    greeting.hide();

  }
}