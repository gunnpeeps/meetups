var signIn = function () {

  const provider = new firebase.auth.GoogleAuthProvider();

  // Event handler for login button
  logIn.click(async function () {

    // Show popup
    const loginTemplate = await (await fetch("../Templates/login.html")).text();
    showPopup(loginTemplate, { "button": "Log In" });

    //  DOMelements 
    const email = $("#email");
    const pass = $("#password");
    const emailpass = $("#email, #password");
    const submit = $("#submit-account");
    const error = $("#error");

    // Submit button event listener
    submit.click(() => {
      firebase.auth().signInWithEmailAndPassword(email.val(), pass.val())
        .then(() => $("#close-popup").trigger('click'))
        .catch(e => {
          error.show().text(e.message);
        });
    });

  });

  signUp.click(async function () {

    // Show popup
    const signupTemplate = await (await fetch("../Templates/signup.html")).text();
    showPopup(signupTemplate, { "button": "Sign Up" });

    // DOM elements
    const email = $("#email");
    const pass = $("#password");
    const emailpass = $("#email, #password");
    const submit = $("#submit-account");
    const error = $("#error");

    // Submit button event listener
    submit.click(async () => {
      await firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val())
        .catch(e => {
          error.text(e.message);
          error.show();
        });
      var emailval = email.val();
      showPopup(
        `<div id='verification'>A verification email has been sent to</div><div>{{email}}</div>`,
        { "email": emailval }
      );
      firebase.auth().currentUser.sendEmailVerification();
    });



  });

  logOut.click(() => firebase.auth().signOut());

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      logIn.hide();
      signUp.hide();
      logOut.show();

      $(".log-in-show-hide").hide();
      $("input[type='date'],input[type='time']").removeClass("hide-icon");
      $(".editable").removeAttr("readonly");
      $(".editable").on('keydown', e => { if (e.which === 13) e.preventDefault(); });

      $(".")
    } else {
      logIn.show();
      signUp.show();
      logOut.hide();

      $(".log-in-show-hide").show();
      $("input[type='date'],input[type='time']").addClass("hide-icon");
      $(".editable").attr("readonly", "true");
    }
  });

};