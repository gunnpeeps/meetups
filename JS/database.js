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

  async getAllMeetups() {
    const meetups = (await this.meetups.orderBy('timestamp').get()).docs.map(doc => {
      var m = doc.data();
      m.id = doc.id;
      return m;
    });
    for (let meetup of meetups) {
      meetup.periods = await this.meetups.doc(meetup.id).collection('periods').orderBy('timestamp').get()
        .then(ps => ps.docs.map(p => {
          var period = p.data();
          period.id = p.id;
          return period;
        }));
    }
    return meetups;
  }

  createMeetup(title = '(title)', date = (new Date()).toISOString().slice(0, 10)) {
    this.meetups.add({
      title: title,
      date: date,
      periodCount: 1,
      timestamp: this.fieldvalue.serverTimestamp()
    })
      .then(doc => this.createPeriod(doc.id))
      .catch(e => console.error("Error creating meetup document: ", e));
  }

  async createPeriod(id, start = '', end = '', activity = '(activity)') {
    const contents = {
      'start': start,
      'end': end,
      'activity': activity,
      timestamp: this.fieldvalue.serverTimestamp()
    }
    await this.meetups.doc(id).collection('periods').add(contents).then(doc => contents.id = doc.id);
    return contents;
  }

  deleteMeetup(id) {
    this.meetups.doc(id).delete();
  }

  updateMeetup(id, key, value) {
    this.meetups.doc(id).update({ [key]: value });
  }

  updatePeriod(docId, periodId, key, value) {
    this.meetups.doc(docId).collection('periods').doc(periodId).update({ [key]: value });
  }

  getEditors() {
    return this.permissions.get()
      .then(p => p.data().editors)
      .catch(e => console.error(e));
  }

}