import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const registerUser = (user, userInfo) => new Promise((resolve, reject) => {
  const userObj = {
    uid: user.uid,
    first_name: userInfo?.firstName,
    last_name: userInfo?.lastName,
    email: userInfo?.email,
    street_address: userInfo?.streetAddress,
    city: userInfo?.city,
    state: userInfo?.state,
    zipcode: userInfo?.zipcode,
    created_on: new Date(new Date().setDate(new Date().getDate())).toISOString().substring(0, 10),
  };
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, signOut, checkUser, registerUser,
};
