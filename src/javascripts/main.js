import '../styles/main.scss';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import home from './components/home/home';
import boards from './components/boards/boards';

const clickEvents = () => {
  $('body').on('click', '#back-to-boards', boards.buildBoards);
  $('body').on('click', '#logout-button', home.signMeOut);
  $('body').on('click', '#login-button', home.signMeIn);
};

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  home.navbarSignIn();
  authData.checkLoginStatus();
  home.navbarSignOut('Boards');
  clickEvents();
};

init();
