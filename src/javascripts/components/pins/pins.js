import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import home from '../home/home';
import './pins.scss';
import newPin from '../newPin/newPin';

// WIP
// Currently trying to traverse the DOM to locate the boardId based on existing pin's board ID's that are closest to the event's target

const submitNewPin = (e) => {
  e.preventDefault();

  console.warn(e.target.closest('.delete-pin').id);
  // const boardId = e.target;
  // const newPin = {
  //   imageUrl: 'hey',
  //   pinName: $('#custom-pin-name').val(),
  //   boardId: ,
  // };
};

//

const deletePin = (e) => {
  e.preventDefault();

  const deleteId = e.target.closest('button').id;
  const { boardId } = e.currentTarget.dataset;

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
      newPin.showPinForm();
      let domString = `
        <div class="d-flex justify-content-center align-items-start flex-wrap board-event">
      `;
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `
            <div class="pin-div">
              <button class="btn delete-pin" id="${pin.id}" data-board-id=${boardId}><i class="fas fa-times-circle"></i></button>
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

export default { buildPins, submitNewPin };
