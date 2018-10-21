import * as firebase from 'firebase';
import 'firebase/firestore';
import { SET_MUSIC, ADD_MUSIC } from './actions';
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCaHkSQGdyvtyTEK-Ys2AjpKuhDu0rxegw',
  authDomain: 'mycollctor.firebaseapp.com',
  databaseURL: 'https://mycollctor.firebaseio.com',
  projectId: 'mycollctor',
  storageBucket: 'mycollctor.appspot.com',
  messagingSenderId: '198939433139'
};
firebase.initializeApp(firebaseConfig);

function handleResponse(response) {
  console.log(response);
  if (response.ok) {
    return response.json();
  } else {
    let errors = new Error(response.statusText);
    errors.response = response;
    throw errors;
  }
}

export function setMusic(music) {
  return {
    type: SET_MUSIC,
    music
  };
}

export function saveMusicFirestore(data) {
  return dispatch => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection('collector').add({
      data
    });

    return userRef;
  };
}

export function saveMusic(data) {
  return dispatch => {
    return fetch('/api/music', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
  };
}

export function fetchMusic() {
  return dispatch => {
    fetch('/api/music')
      .then(res => res.json())
      .then(data => dispatch(setMusic(data.music)));
  };
}
