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
      .then(meetups => meetups.docs.map(m => {
        var newm = m.data();
        newm.id = m.id;
        return newm
      }))
      .catch(e => console.log(e.message));
  }

  createMeetup(title, date) {
    this.meetups.add({
      "title": title,
      "date": date,
      "periods": []
    });
  }
  deleteMeetup(id) {
    this.meetups.doc(id).delete();
  }

  updateMeetup(id, key, value) {
    this.meetups.doc(id).update({ [key]: value });
  }

  getEditors() {
    return this.permissions.get()
      .then(p => p.data().editors)
      .catch(e => console.error(e));
  }

}