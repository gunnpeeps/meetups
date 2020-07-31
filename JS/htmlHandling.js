$(async () => {
  const logInSignUp = $(".log-in-sign-up");
  const popupContainer = $("#popup-container");
  const popup = popupContainer.find("#popup-target");
  const cards = $("#card-container");
  const cardTemplate = await (await fetch("../Templates/meetup-card.html")).text();
  const meetups = await database.getAllMeetups();

  for (let meetup of meetups) {
    cards.append(Mustache.render(cardTemplate, meetup));
  }

  // Event handler for login button
  logInSignUp.click(async function () {

    // Show popup
    const template = await (await fetch("../Templates/signin.html")).text();
    showPopup(template, { "button": this.innerText });

    // DOM elements
    const email = $("#email");
    const pass = $("#password");
    const emailpass = $("#email, #password");
    const submit = $("#submit-account");
    const error = $("#error");

    // Checks every time email input changes
    emailpass.on('input', () => {
      if (verifyInfo(email.val(), pass.val())) {
        submit.attr("class", "clickable");
      } else {
        submit.attr("class", "unclickable");
      }
    });
    emailpass.trigger('input');

    // Submit button event listener
    error.hide();
    if (this.id == "log-in") {
      submit.click(() => {
        if (submit.attr("class") == "clickable") {
          database.logIn(email.val(), pass.val())
            .catch(e => {
              error.show().text(e);
            })
            .then(user => {
              if (user) {
                error.hide();
              } else {
                error.show().text("Invalid username and/or password.");
              }
            });
        }
      });
    } else {
      submit.click(() => {
        if (submit.attr("class") == "clickable") {
          database.signUp(email.val(), pass.val())
            .catch(e => {
              error.show().text(e);
            })
            .then(user => {
              if (user) {
                error.hide();
              } else {
                error.show().text("Invalid username and/or password.");
              }
            });
        }
      });
    }

  });

  function verifyInfo(email, pass) {
    if (
      email.includes("@") &&
      email.slice(-4) == ".com" &&
      pass
    ) {
      return true;
    }
    return false;
  }

  function showPopup(template, obj) {
    popup.html(Mustache.render(template, obj));
    popupContainer.fadeIn();
    $("#close-popup").click(() => popupContainer.fadeOut());
  }

});