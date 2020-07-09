import home from '../home/home';
import boardsData from '../../helpers/data/boardsData';
import pins from '../pins/pins';
import utils from '../../helpers/utils';
import './boards.scss';

const buildBoardsPins = (e) => {
  e.preventDefault();
  const boardId = e.target.closest('.board-frame').id;
  pins.buildPins(boardId);
};

const deleteBoard = (e) => {
  const deleteId = e.target.classList[0];
  console.warn(deleteId);
  // boardsData.deleteBoard(deleteId)
  //   .then(() => {
  //     boardsData.getBoards()
  //       .then(() => {
  //         // eslint-disable-next-line no-use-before-define
  //         buildBoards();
  //       })
  //       .catch((err) => console.warn('getting new pins did not work -> ', err));
  //   })
  //   .catch((err) => console.error('Deleting this pin did not work -> ', err));
};

const buildBoards = () => {
  home.navbarSignOut('Boards');
  utils.printToDom('#pins', '');
  boardsData.getBoards()
    .then((boards) => {
      let domString = '<div class="d-flex justify-content-center mt-5">';
      boards.forEach((board) => {
        domString += `
          <div>
            <div class="board-frame" id="${board.id}">
              <h1 class="board-pin-name">${board.boardName}</h1>
            </div>
            <div class="d-flex justify-content-center">
              <button class="${board.id} btn delete-board btn-secondary"><i class="fas fa-times"></i> Delete Board</button>
            </div>
          </div>
        `;
        $('body').on('click', `#${board.id}`, buildBoardsPins);
        $('body').on('click', `.${board.id}`, deleteBoard);
      });
      domString += '</div>';
      utils.printToDom('#boards', domString);
    })
    .catch((err) => console.error('Getting the boards did not work - ', err));
};

export default { buildBoards };
