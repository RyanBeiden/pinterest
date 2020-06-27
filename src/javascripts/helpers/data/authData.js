import firebase from 'firebase/app';
import 'firebase/auth';
import pins from '../../components/pins/pins';

const homeNav = $('#home-nav');
const boardsNav = $('#boards-nav');
const printedPins = $('#pins');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeNav.addClass('hide');
      boardsNav.removeClass('hide');
      printedPins.removeClass('hide');
      pins.buildPins();
    } else {
      homeNav.removeClass('hide');
      boardsNav.addClass('hide');
      printedPins.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
