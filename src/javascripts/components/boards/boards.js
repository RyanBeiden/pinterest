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

const buildBoards = () => {
  home.navbarSignOut('Boards');
  utils.printToDom('#pins', '');
  boardsData.getBoards()
    .then((boards) => {
      let domString = '<div class="d-flex justify-content-center mt-5">';
      boards.forEach((board) => {
        domString += `
          <div class="board-frame" id="${board.id}">
            <h1 class="board-pin-name">${board.boardName}</h1>
            <button class="btn delete-board btn-danger" id="${board.id}"><i class="fas fa-times-circle"></i> Delete Board</button>
          </div>
        `;
        $('body').on('click', `#${board.id}`, buildBoardsPins);
      });
      domString += '</div>';
      utils.printToDom('#boards', domString);
    })
    .catch((err) => console.error('Getting the boards did not work - ', err));
};

export default { buildBoards };
