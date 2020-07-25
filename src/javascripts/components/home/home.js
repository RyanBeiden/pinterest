import firebase from 'firebase/app';
import 'firebase/auth';
import userData from '../../helpers/data/userData';
import utils from '../../helpers/utils';
import './home.scss';

const signMeIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider)
    .then((user) => {
      const newUser = {
        uid: user.uid,
      };
      userData.addUser(newUser);
    })
    .then(() => {})
    .catch((err) => console.error(err));
};

const navbarSignIn = () => {
  const domString = `
    <nav>
      <div class="navbar-left">
        <i class="fab fa-pinterest col"></i>
      </div>
      <div class="navbar-center">
        <h1>Pinterest</h1>
      </div>
      <div class="navbar-right">
        <img class="google-sign-in" id="login-button"
          src="https://firebasestorage.googleapis.com/v0/b/pinterest-1e98b.appspot.com/o/assets%2Fbtn_google_signin_light_normal_web%402x.png?alt=media&token=e3bf1fd3-7b61-4fb2-b0a9-b509e34ee140">
      </div>
    </nav>
  `;
  utils.printToDom('#home-nav', domString);
};

const navbarSignOut = (typeOfPage) => {
  const domString = `
    <nav>
      <div class="navbar-left">
        <i class="fab fa-pinterest col"></i>
      </div>
      <div class="navbar-center">
        <h1>${typeOfPage}</h1>
      </div>
      <div class="navbar-right">
        <button id="logout-button" class="btn btn-secondary">Logout <i class="fas fa-arrow-right pl-1"></i></button>
        <img class="profile-pic" src="${firebase.auth().currentUser.photoURL}">
      </div>
    </nav>
  `;
  utils.printToDom('#boards-nav', domString);
};

const signMeOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut();
};

export default {
  navbarSignIn,
  signMeIn,
  navbarSignOut,
  signMeOut,
};
