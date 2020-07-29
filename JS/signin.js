$(async function () {
  var login = $("#log-in");
  var signup = $("#sign-up");
  var popupContainer = $("#popup-container");
  var popup = popupContainer.find("#popup");
  var template = await (await fetch("../Templates/signin.html")).text();

  login.click(function () {
    popup.html(Mustache.render(template, {
      "button": "Log In",
      "buttonid": "log-in-submit"
    }));
    popupContainer.fadeIn();

    $("#submit-account").click(function () {
      var email = $("#email");
      var pass = $("#password");

      database.logIn(email.val(), pass.val());
    });
  });

  signup.click(function () {
    popup.html(Mustache.render(template, { "button": "Sign Up" }));
    popupContainer.fadeIn();

    $("#submit-account").click(function () {
      var email = $("#email");
      var pass = $("#password");

      database.signUp(email.val(), pass.val());
    });
  });
});