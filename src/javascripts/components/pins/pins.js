import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import home from '../home/home';
import newPin from '../newPin/newPin';
import './pins.scss';

// WIP
// the boardId now is pulled correctly for the new pin, next I either need to figure out how to upload the image to firebase storage and pull
// its URL, or change that input to just a URL that will be printed. I also need still create the data in firebase before reprinting

const submitNewPin = (e) => {
  e.preventDefault();

  const { boardId } = e.delegateTarget.children[4].children[0].children[0].children[0].dataset;

  const newFormPin = {
    imageUrl: 'hey',
    pinName: $('#custom-pin-name').val(),
    boardId,
  };

  console.warn(newFormPin);
};

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
        </div>
      `;
      utils.printToDom('#pins', domString);
      utils.printToDom('#boards', '');
    })
    .catch((err) => console.error('Getting the pins did not work -> ', err));
};

export default { buildPins, submitNewPin };
