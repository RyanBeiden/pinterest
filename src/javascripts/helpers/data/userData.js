import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const addUser = (newUser) => axios.post(`${baseUrl}/users.json`, newUser);

export default { addUser };
