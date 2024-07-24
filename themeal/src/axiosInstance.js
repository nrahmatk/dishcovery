import axios from 'axios';

const InstanceServer = axios.create({
  baseURL: 'https://dish.astrono.my.id',
  // baseURL: 'http://localhost:3000',
});

export default InstanceServer;
