import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import './home.scss';

const signMeIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider);
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
        <img class="google-sign-in" id="login-button" src="./src/assets/btn_google_signin_light_normal_web@2x.png">
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
        <img class="profile-pic" src="${firebase.auth().currentUser.photoURL}">
        <button id="logout-button" class="btn btn-secondary">Logout <i class="fas fa-arrow-right pl-1"></i></button>
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
