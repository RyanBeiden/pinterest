import '../styles/main.scss';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import home from './components/home/home';
import boards from './components/boards/boards';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  home.navbarSignIn();
  authData.checkLoginStatus();
  boards.navbarSignOut();
};

init();
