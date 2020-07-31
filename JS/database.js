class Database {

  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyBeF-utzLhcXMG1J0qqrWzk_qYtJx8HM9U",
      authDomain: "gunn-peeps.firebaseapp.com",
      databaseURL: "https://gunn-peeps.firebaseio.com",
      projectId: "gunn-peeps",
      storageBucket: "gunn-peeps.appspot.com",
      messagingSenderId: "141473042666",
      appId: "1:141473042666:web:ce07e25d84cec89cad8793"
    });
    this.ref = firebase.firestore().collection('Meetup Cards');
    this.auth = firebase.auth();
  }

  getAllMeetups() {
    return this.ref.get().then(coll => {
      return coll.docs.map(doc => {
        var newDoc = doc.data();
        for (let i = 1; i < newDoc.periods.length; i++) {
          newDoc.periods[i].start = newDoc.periods[i - 1].end;
        }
        newDoc.id = doc.id;
        return newDoc;
      });
    });
  }

  createMeetup(title, time) {
    this.ref.add({
      "title": title,
      "time": time,
      "periods": []
    });
  }

  deleteMeetup(id) {
    this.ref.doc(id).delete();
  }

  logIn(email, pass) {
    return this.auth.signInWithEmailAndPassword(email, pass);
  }

  signUp(email, pass) {
    return this.auth.createUserWithEmailAndPassword(email, pass);
  }

}