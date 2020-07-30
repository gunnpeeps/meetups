class Html {

  constructor() {
    $(() => {
      this.login = $("#log-in");
      this.signup = $("#sign-up");
      this.popupContainer = $("#popup-container");
      this.popup = this.popupContainer.find("#popup-target");

      this.eventHandlers();
      this.createMeetups();
    });
  }

  async createMeetups() {
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
  }

  eventHandlers() {
    this.loginClick();
    this.signupClick();
  }

  loginClick() {
    this.login.click(async () => {

      var template = await (await fetch("../Templates/signin.html")).text();
      var submit = $("#submit-account");
      var email = $("#email");
      var pass = $("#password");

      // Shows popup with login input
      this.showPopup(template, { "button": "Log In" });

      // Verify login info
      email.change(() => {
        console.log("hi");
        if (this.verifyEmail(email.val())) {
          submit.removeClass("unclickable");
        } else {
          submit.addClass("unclickable");
        }
      });

      // Submit login info
      submit.click(() => {
        database.logIn(email.val(), pass.val());
      });
    });
  }

  signupClick() {
    this.signup.click(async () => {
      var template = await (await fetch("../Templates/signin.html")).text();

      // Shows popup with login input
      this.showPopup(template, { "button": "Sign Up" });

      // Verifies and submits login info
      $("#submit-account").click(function () {
        var email = $("#email").val();
        var pass = $("#password").val();

        database.signUp(email, pass);
      });
    });
  }

  verifyEmail(email) {
    return false;
  }

  verifyPass(pass) {
    return false;
  }

  showPopup(template, obj) {
    this.popup.html(Mustache.render(template, obj));
    this.popupContainer.fadeIn();
    $("#close-popup").click(() => this.popupContainer.fadeOut());
  }

}