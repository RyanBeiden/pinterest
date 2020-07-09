import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import home from '../home/home';
import './pins.scss';

const buildPins = (e) => {
  e.preventDefault();

  home.navbarSignOut('Pins');
  $('#pins').removeClass('hide');

  const boardId = e.target.closest('.board-frame').id;
  pinsData.getPins()
    .then((pins) => {
      let domString = `
        <div class="container">
          <button class="btn btn-warning" id="back-to-boards">Back to Boards</button>
      `;
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `
            <h1 class="pin-name">${pin.pinName}</h1>
            <div class="d-flex justify-content-center">
              <img class="pin-image" src="${pin.imageUrl}">
            </div>
          `;
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
