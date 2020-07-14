import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const boardsObjects = response.data;
      const boards = [];
      if (boardsObjects) {
        Object.keys(boardsObjects).forEach((boardId) => {
          boardsObjects[boardId].id = boardId;
          boards.push(boardsObjects[boardId]);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const addBoard = (newBoardObject) => axios.post(`${baseUrl}/boards.json`, newBoardObject);

export default { getBoards, deleteBoard, addBoard };
