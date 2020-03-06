    function getData() {
      // Your web app's Firebase configuration
      let firebaseConfig = {
        apiKey: "AIzaSyC5veCoPDfBM7Vj4WOfI-xN0lLwiZUK_yo",
        authDomain: "tsuiokuyo-8a31a.firebaseapp.com",
        databaseURL: "https://tsuiokuyo-8a31a.firebaseio.com",
        projectId: "tsuiokuyo-8a31a",
        storageBucket: "tsuiokuyo-8a31a.appspot.com",
        messagingSenderId: "546368251283",
        appId: "1:546368251283:web:23253f9e609b874d897466",
        measurementId: "G-DXFDWHTMQX"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
      let db = firebase.firestore();
      let ref = db.collection('動畫');
      let object = [];
      ref.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          object.push({
            id: doc.id,
            data: doc.data()
          })
        });
      });
      return object;
    }
