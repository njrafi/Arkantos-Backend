const admin = require("firebase-admin")

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://arkantos-1.firebaseio.com",
    storageBucket: 'gs://arkantos-1.appspot.com/'
  });