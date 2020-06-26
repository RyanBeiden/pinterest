import firebase from 'firebase/app';
import 'firebase/auth';

const homeNav = $('#home-nav');
const boardsNav = $('#boards-nav');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeNav.addClass('hide');
      boardsNav.removeClass('hide');
    } else {
      homeNav.removeClass('hide');
      boardsNav.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
