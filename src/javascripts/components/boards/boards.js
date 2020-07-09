import home from '../home/home';
import boardsData from '../../helpers/data/boardsData';
import pins from '../pins/pins';
import utils from '../../helpers/utils';
import './boards.scss';

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
          </div>
        `;
        $('body').on('click', `#${board.id}`, pins.buildPins);
      });
      domString += '</div>';
      utils.printToDom('#boards', domString);
    })
    .catch((err) => console.error('Getting the boards did not work - ', err));
};

export default { buildBoards };
