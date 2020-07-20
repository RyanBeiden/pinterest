import '../styles/main.scss';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';
import authData from './helpers/data/authData';
import home from './components/home/home';
import boards from './components/boards/boards';
import pins from './components/pins/pins';

const clickEvents = () => {
  $('body').on('click', '#back-to-boards', boards.buildBoards);
  $('body').on('click', '#logout-button', home.signMeOut);
  $('body').on('click', '#login-button', home.signMeIn);
  $('body').on('click', '#submit-pin', pins.submitNewPin);
  $('body').on('click', '#submit-board', boards.submitNewBoard);
};

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  clickEvents();
};

init();
