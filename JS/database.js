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
  }

  async getAllMeetups() {
    return this.ref.get().then(coll => {
      return coll.docs.map(doc => doc.data());
    });
  }

}