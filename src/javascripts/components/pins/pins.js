import pinsData from '../../helpers/data/pinsData';
import utils from '../../helpers/utils';
import './pins.scss';

const buildPins = () => {
  pinsData.getPins()
    .then((pins) => {
      let domString = `
        <div class="container">
      `;
      pins.forEach((pin) => {
        domString += `
          <h1 class="pin-name">${pin.pinName}</h1>
          <div class="d-flex justify-content-center">
            <img class="pin-image" src="${pin.imageUrl}">
          </div>
        `;
      });
      domString += `
        </div>
      `;
      utils.printToDom('#pins', domString);
    })
    .catch((err) => console.error('get pins did not work...', err));
};

export default { buildPins };
