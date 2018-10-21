import * as firebase from 'firebase';
import 'firebase/firestore';

export const SET_MUSIC = 'SET_MUSIC';
export const ADD_MUSIC = 'ADD_MUSIC';

const firebaseConfig = {
  apiKey: 'AIzaSyCaHkSQGdyvtyTEK-Ys2AjpKuhDu0rxegw',
  authDomain: 'mycollctor.firebaseapp.com',
  databaseURL: 'https://mycollctor.firebaseio.com',
  projectId: 'mycollctor',
  storageBucket: 'mycollctor.appspot.com',
  messagingSenderId: '198939433139'
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export function setMusic(music) {
  return {
    type: SET_MUSIC,
    music
  };
}

export function addMusic(response) {
  return {
    type: ADD_MUSIC,
    response
  };
}

export function saveMusic(data) {
  return dispatch => {
    db.collection('collector')
      .doc()
      .set(data)
      .then(function() {
        console.log('Document successfully written!');
        dispatch(addMusic({ status: 'added' }));
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });
  };
}

// export function saveMusic(data) {
//   return dispatch => {
//     return fetch('/api/music', {
//       method: 'post',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json' }
//     });
//   };
// }

// export function fetchMusic() {
//   return dispatch => {
//     fetch('/api/music')
//       .then(res => res.json())
//       .then(data => dispatch(setMusic(data.music)));
//   };
// }

export function fetchMusic() {
  var dataArr = [];
  return dispatch => {
    db.collection('collector')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          dataArr.push(doc.data());
        });
      })
      .then(() => dispatch(setMusic(dataArr)));
  };
}
