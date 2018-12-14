import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-3208c.firebaseio.com/'
});

export default instance;
