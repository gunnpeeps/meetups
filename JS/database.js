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
    this.permissions = this.database.collection('Permissions').doc('Meetups');
    this.meetups = this.database.collection('Meetups');
  }

  getAllMeetups() {
    return this.meetups.get()
      .then(meetups => meetups.docs)
      .catch(e => console.log(e.message));
  }

  createMeetup(title, time) {
    this.meetups.add({
      "title": title,
      "time": time,
      "periods": []
    });
  }
  deleteMeetup(id) {
    this.meetups.doc(id).delete();
  }

  updateMeetup(id, update) {
    this.meetups.doc(id).update(update);
  }

  getEditors() {
    return this.permissions.get()
      .then(p => p.data().editors)
      .catch(e => console.error(e));
  }

}