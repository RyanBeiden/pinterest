import firebase from 'firebase/app';
import 'firebase/auth';
import boardsData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';
import './boards.scss';

const signMeOut = (e) => {
  e.preventDefault();
  firebase.auth().signOut();
};

const navbarSignOut = () => {
  const domString = `
    <nav class="row">
      <i class="fab fa-pinterest col"></i>
      <h1 class="col">Boards</h1>
      <div class="col d-flex justify-content-end mr-5">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label id="logout-button" class="btn btn-secondary">
            <p>Logout </p>
          </label>
          <label id="log-out-icon" class="btn btn-secondary">
            <i class="fas fa-sign-out-alt"></i>
          </label>
        </div>
      </div>
    </nav>
  `;
  utils.printToDom('#boards-nav', domString);
  $('body').on('click', '#logout-button', signMeOut);
};

// still wip

const openBoard = (e) => {
  e.preventDefault();
  console.warn(e.target.id);
};

const buildBoards = () => {
  boardsData.getBoards()
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        domString += `
          <div class="board-frame" id="${board.boardName}">
            <h1 class="pin-name">${board.boardName}</h1>
          </div>
        `;
      });
      utils.printToDom('#boards', domString);
      boards.forEach((board) => {
        $('body').on('click', `#${board.boardName}`, openBoard);
      });
    })
    .catch((err) => console.error('Getting the boards did not work - ', err));
};

//

export default { navbarSignOut, buildBoards };
