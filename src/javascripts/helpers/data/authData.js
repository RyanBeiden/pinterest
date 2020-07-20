import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';
import home from '../../components/home/home';

const homeNav = $('#home-nav');
const boardsNav = $('#boards-nav');
const printedPins = $('#pins');
const printedBoards = $('#boards');
const boardForm = $('#board-form');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      homeNav.addClass('hide');
      boardsNav.removeClass('hide');
      printedBoards.removeClass('hide');
      boardForm.removeClass('hide');
      home.navbarSignOut('Boards');
      boards.buildBoards();
    } else {
      homeNav.removeClass('hide');
      boardsNav.addClass('hide');
      printedPins.addClass('hide');
      printedBoards.addClass('hide');
      boardForm.addClass('hide');
      home.navbarSignIn();
    }
  });
};

export default { checkLoginStatus };
