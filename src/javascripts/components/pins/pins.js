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
        <button class="btn btn-warning back-boards" id="back-to-boards"><i class="fas fa-arrow-left"></i> Back to Boards</button>
          <div class="d-flex justify-content-center align-items-start">
      `;
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `
            <div class="pin-div">
              <h1 class="pin-name">${pin.pinName}</h1>
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
