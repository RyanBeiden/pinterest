import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';

const homeNav = $('#home-nav');
const boardsNav = $('#boards-nav');
const printedPins = $('#pins');
const printedBoards = $('#boards');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeNav.addClass('hide');
      boardsNav.removeClass('hide');
      printedBoards.removeClass('hide');
      boards.buildBoards();
    } else {
      homeNav.removeClass('hide');
      boardsNav.addClass('hide');
      printedPins.addClass('hide');
      printedBoards.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
