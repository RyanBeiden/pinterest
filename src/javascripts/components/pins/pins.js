import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import home from '../home/home';
import './pins.scss';

const deletePin = (e) => {
  e.preventDefault();

  const deleteId = e.target.closest('button').id;
  const boardId = e.target.closest('.board-event').id;

  pinsData.deletePin(deleteId)
    .then(() => {
      pinsData.getPins()
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          buildPins(boardId);
        })
        .catch((err) => console.warn('getting new pins did not work -> ', err));
    })
    .catch((err) => console.error('Deleting this pin did not work -> ', err));
};

const buildPins = (boardId) => {
  home.navbarSignOut('Pins');
  $('#pins').removeClass('hide');

  pinsData.getPins()
    .then((pins) => {
      let domString = `
        <button class="btn btn-warning back-boards" id="back-to-boards"><i class="fas fa-arrow-left"></i> Back to Boards</button>
          <div class="d-flex justify-content-center align-items-start board-event" id="${boardId}">
      `;
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `
            <div class="pin-div">
              <button class="btn delete-pin" id="${pin.id}"><i class="fas fa-times-circle"></i></button>
              <h1 class="pin-name">${pin.pinName}</h1>
              <img class="pin-image" src="${pin.imageUrl}">
            </div>
          `;
          $('body').one('click', `#${pin.id}`, deletePin);
        } else;
      });
      domString += `
        </div>
      `;
      utils.printToDom('#pins', domString);
      utils.printToDom('#boards', '');
    })
    .catch((err) => console.error('Getting the pins did not work -> ', err));
};

export default { buildPins };
