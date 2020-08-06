function signIn() {

  const provider = new firebase.auth.GoogleAuthProvider();

  // Event handler for login button
  logIn.click(async function () {

    // Show popup
    const loginTemplate = await (await fetch("../meetups/Templates/login.html")).text();
    showPopup(loginTemplate, { "button": "Log In" });

    //  DOMelements 
    const email = $("#email");
    const pass = $("#password");
    const emailpass = $("#email, #password");
    const submit = $("#submit-account");
    const error = $("#email-error");
    const googleLogIn = $(".google-log-in");

    // Submit button event listener
    submit.click(() => {
      firebase.auth().signInWithEmailAndPassword(email.val(), pass.val())
        .then(() => closePopup.trigger('click'))
        .catch(e => {
          error.text(e.message).show();
        });
    });

    googleLogIn.click(() => {
      firebase.auth().signInWithPopup(provider)
        .then(() => closePopup.trigger('click'))
        .catch(function (error) {
          console.log(error.message);
        });
    });

  });

  signUp.click(async function () {

    // Show popup
    const signupTemplate = await (await fetch("../meetups/Templates/signup.html")).text();
    showPopup(signupTemplate, { "button": "Sign Up" });

    // DOM elements
    const email = $("#email");
    const pass = $("#password");
    const emailpass = $("#email, #password");
    const submit = $("#submit-account");
    const error = $("#error");
    const googleLogIn = $(".google-log-in");

    // Submit button event listener
    submit.click(async () => {
      await firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val())
        .then(() => {
          var emailval = email.val();
          showPopup(
            `<div id='verification'>A verification email has been sent to</div><div>{{email}}</div>`,
            { "email": emailval }
          );
          firebase.auth().currentUser.sendEmailVerification();
        })
        .catch(e => {
          error.text(e.message).show();
        });
    });

    googleLogIn.click(() => {
      firebase.auth().signInWithPopup(provider)
        .then(() => $("#close-popup").trigger('click'))
        .catch(e => console.log(e.message));
    });

  });

  logOut.click(() => firebase.auth().signOut());

}
