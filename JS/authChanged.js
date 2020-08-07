async function authChanged(user) {
  if (user && user.emailVerified) {

    await loadMeetups();

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

      $("#add-meetup").click(async () => {
        await database.createMeetup();
        await loadMeetups();
      });
      $(".add-period").click(async function () {
        const obj = await database.createPeriod($(this).parents(".meetup-card")[0].id);
        $(this).siblings(".schedule-periods").append(Handlebars.compile(`
          <tr class="schedule-period">
            <td><input class="period-start periods.{{num}}.start" type="time" value={{start}}></td>
            <td class="dash">-</td>
            <td><input class="period-end periods.{{num}}.end" type="time" value={{end}}></td>
            <td><input class="period-activity periods.{{num}}.activity" type="text" value={{activity}}></td>
          </tr>
        `)(obj));
        console.log(Handlebars.compile(`
          <tr class="schedule-period">
            <td><input class="period-start periods.{{num}}.start" type="time" value={{start}}></td>
            <td class="dash">-</td>
            <td><input class="period-end periods.{{num}}.end" type="time" value={{end}}></td>
            <td><input class="period-activity periods.{{num}}.activity" type="text" value={{activity}}></td>
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

    cardsError.fadeOut(() => cardsError.text("Log in to see meetups")).fadeIn();

    logIn.show();
    signUp.show();
    logOut.hide();
    greeting.hide();

  }
}