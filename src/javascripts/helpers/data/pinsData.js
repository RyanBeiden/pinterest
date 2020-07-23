import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json`)
    .then((response) => {
      const pinsObjects = response.data;
      const pins = [];
      if (pinsObjects) {
        Object.keys(pinsObjects).forEach((pinId) => {
          pinsObjects[pinId].id = pinId;
          pins.push(pinsObjects[pinId]);
        });
      }
      resolve(pins);
    })
    .catch((err) => reject(err));
});

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const addPin = (newPinObject) => axios.post(`${baseUrl}/pins.json`, newPinObject);

const updatePin = (pinId, editedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, editedPin);

export default {
  getPins,
  deletePin,
  addPin,
  updatePin,
};
