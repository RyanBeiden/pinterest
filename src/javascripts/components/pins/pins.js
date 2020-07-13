import firebase from 'firebase/app';
import 'firebase/storage';

import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import home from '../home/home';
import newPin from '../newPin/newPin';
import './pins.scss';

// WIP / my current issue:
// I managed to upload the images to firebase storage and pull them back down correctly and print a new card with the name of the new pin
// all being correctly added to Firebase Database, I also managed to delete the image from the storage when the pin is deleted.
// MY ISSUE: I can't add a new pin when there are no pins in an existing board due to an error not correctly finding the boardId
// this is because of the findBoard function within the submitNewPin function not being able to traverse a non-existent DOM.
// Maybe and an if/else statement?

const submitNewPin = (e) => {
  e.preventDefault();

  const findBoard = e.delegateTarget.children[4].children[0].children[0].children[0].dataset.boardId;
  const name = $('#custom-pin-name').val();
  const file = document.getElementById('custom-pin-image').files[0];
  const image = file.name;

  const ref = firebase.storage().ref(`pins/${image}`);

  const newFormPin = {
    imageUrl: '',
    pinName: name,
    boardId: findBoard,
  };

  ref.put(file).then(() => {
    ref.getDownloadURL().then((url) => {
      newFormPin.imageUrl = url;
      pinsData.addPin(newFormPin).then(() => {
        // eslint-disable-next-line no-use-before-define
        buildPins(findBoard);
      });
    });
  })
    .catch((err) => console.error('could not add new pin', err));
};

const deletePin = (e) => {
  e.preventDefault();

  const deleteId = e.target.closest('button').id;
  const { boardId } = e.currentTarget.dataset;

  // delete image fro firebase storage

  pinsData.getPins()
    .then((pins) => {
      pins.forEach((pin) => {
        if (pin.id === deleteId) {
          const imageToDelete = firebase.storage().refFromURL(`${pin.imageUrl}`);
          imageToDelete.delete()
            .then().catch((err) => console.error('deleting the pin\'s image did not work -> ', err));
        }
      });
    })
    .catch((err) => console.error('getting the pins for delete of image did not work -> ', err));

  // delete entire pin from database

  pinsData.deletePin(deleteId)
    .then(() => {
      pinsData.getPins()
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          buildPins(boardId);
        })
        .catch((err) => console.warn('getting new pins after pin delete did not work -> ', err));
    })
    .catch((err) => console.error('deleting this pin did not work -> ', err));
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
              <image class="pin-image" src="${pin.imageUrl}">
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
