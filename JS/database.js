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
    this.fieldvalue = firebase.firestore.FieldValue;
    this.users = this.database.collection('Users');
    this.permissions = this.database.collection('Permissions').doc('Meetups');
    this.meetups = this.database.collection('Meetups');
  }

  getAllMeetups() {
    return this.meetups.orderBy('timestamp').get()
      .then(meetups => meetups.docs.map(m => {
        var newm = m.data();
        newm.id = m.id;
        return newm
      }))
      .catch(e => console.log(e.message));
  }

  createMeetup(title = '(title)', date = (new Date()).toISOString().slice(0, 10)) {
    this.meetups.add({
      "title": title,
      "date": date,
      "periods": [],
      "periodCount": 1,
      "timestamp": this.fieldvalue.serverTimestamp()
    });
  }

  deleteMeetup(id) {
    this.meetups.doc(id).delete();
  }

  updateMeetup(id, key, value) {
    this.meetups.doc(id).update({ [key]: value });
  }

  async createPeriod(id, start = '', end = '', activity = '(activity)') {
    const num = await this.meetups.doc(id).get().then(doc => doc.data().periodCount);
    this.meetups.doc(id).update({
      periodCount: this.fieldvalue.increment(1),
      [`periods.${num}`]: {
        "start": start,
        "end": end,
        "activity": activity
      }
    });
    return {
      "num": num,
      "start": start,
      "end": end,
      "activity": activity
    }
  }

  getEditors() {
    return this.permissions.get()
      .then(p => p.data().editors)
      .catch(e => console.error(e));
  }

}