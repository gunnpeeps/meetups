function signIn() {

  // Event handler for login button
  logIn.on('click', async function () {

    // Show popup with log in template
    showPopup(
      await (await fetch(`./Templates/login.html`)).text(),
      { "button": "Log In" }
    );

    //  DOMelements
    const email = $("#email");
    const pass = $("#password");
    const submit = $("#submit-account");
    const error = $("#email-error");
    const googleLogIn = $(".google-log-in");

    // Submit button event listener
    submit.on('click', () => {
      firebase.auth().signInWithEmailAndPassword(email.val(), pass.val())
        .then(() => {
          closePopup.trigger('click');
        })
        .catch(e => error.text(e.message).show());
    });

    googleLogIn.on('click', () => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => closePopup.trigger('click'))
        .catch(e => console.error("Error logging in with Google: ", e));
    });

  });

  signUp.on('click', async function () {

    // Show Popup with sign in template
    showPopup(
      await (await fetch(`./Templates/signup.html`)).text(),
      { "button": "Sign Up" }
    );

    // DOM elements
    const username = $("#username");
    const email = $("#email");
    const pass = $("#password");
    const submit = $("#submit-account");
    const error = $("#error");
    const googleLogIn = $(".google-log-in");

    // Submit button event listener
    submit.on('click', async () => {
      await firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val())
        .then(() => {
          firebase.auth().updateUser({ displayName: username.val() });
          showPopup(
            `<div id='verification'>A verification email has been sent to</div><div>{{email}}</div>`,
            { "email": email.val() }
          );
          firebase.auth().currentUser.sendEmailVerification();
        })
        .catch(e => {
          error.text(e.message).show();
        });
    });

    googleLogIn.on('click', () => {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(() => $("#close-popup").trigger('click'))
        .catch(e => console.error("Error logging in with Google: ", e));
    });

  });

  logOut.on('click', () => firebase.auth().signOut());

}
