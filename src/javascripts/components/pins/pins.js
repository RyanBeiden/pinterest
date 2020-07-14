import firebase from 'firebase/app';
import 'firebase/storage';

import pinsData from '../../helpers/data/pinsData';
import boardsData from '../../helpers/data/boardsData';
import utils from '../../helpers/utils';
import home from '../home/home';
import newPin from '../newPin/newPin';
import './pins.scss';

const submitNewPin = (e) => {
  e.preventDefault();

  const findBoard = e.delegateTarget.children[5].children[0].dataset.emptyBoard;
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

  // delete image from firebase storage

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

// WIP: currently trying to update the board a pin is on through a dropdown form
// I managed to get the form to dropdown when clicking the edit button for each pin
// My current issue is correctly pulling each board as an option for thr radio button.
// I feel like an issue may be with how I am looping through the boards array while inside another
// `forEach` for the pins. It could be as simple as some misplaced curly braces or parenthesis, but
// I am so stumped and need to step away.

const editPinEvent = (e) => {
  e.preventDefault();

  const editId = e.target.closest('button').dataset.editPinId;
  const { boardId } = e.currentTarget.dataset;

  console.warn(editId, boardId);
};

const buildPins = (boardId) => {
  home.navbarSignOut('Pins');
  $('#pins').removeClass('hide');

  pinsData.getPins()
    .then((pins) => {
      newPin.showPinForm();
      let domString = `
        <div class="d-flex justify-content-center align-items-start flex-wrap board-event" data-empty-board=${boardId}>
      `;
      pins.forEach((pin) => {
        if (pin.boardId === boardId) {
          domString += `
            <div class="pin-div">
              <button class="btn delete-pin" id="${pin.id}" data-board-id=${boardId}><i class="fas fa-times-circle"></i></button>
              <h1 class="pin-name">${pin.pinName}</h1>
              <image class="pin-image" src="${pin.imageUrl}">
              <div class="d-flex justify-content-end">
                <div class="btn-group dropleft">
                <button type="button" class="dropdown-toggle btn edit-pin" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-edit"></i></button>
                  <div class="dropdown-menu edit-pin-form">
                    <form>
                      <div class="form-group">
                        <label for="custom-pin-name">Which board should "${pin.pinName}" belong too?</label>
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">`;
          boardsData.getBoards()
            .then((allBoards) => {
              allBoards.forEach((eachBoard) => {
                domString += `
                <label class="btn btn-secondary active">
                  <input type="radio" name="options" id="option1" autocomplete="off" checked> ${eachBoard.boardName}
                </label>
              `;
              });
            });
          domString += `
                        </div>
                      </div>
                      <button type="submit" class="btn btn-danger update-pin" id="update-pin" data-board-id=${boardId} data-edit-pin-id=${pin.id}>Update</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          `;
          $('body').one('click', `#${pin.id}`, deletePin);
          $('body').one('click', '#update-pin', editPinEvent);
        } else;
      });
      domString += `
        </div>
      `;
      utils.printToDom('#pins', domString);
      utils.printToDom('#boards', '');
      utils.printToDom('#board-form', '');
    })
    .catch((err) => console.error('Getting the pins did not work -> ', err));
};

export default { buildPins, submitNewPin };
