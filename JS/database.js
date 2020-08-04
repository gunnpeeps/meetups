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
    this.database = firebase.firestore();
    this.users = this.database.collection('Users');
    this.ref = this.database.collection('Meetups');
  }

  getAllMeetups() {
    return this.ref.get().then(coll => {
      return coll.docs.map(doc => {
        var newDoc = doc.data();
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

}