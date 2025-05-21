import axios from 'axios';
import { PLAYLIST_BACKEND_API } from './config';



export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': 'true'
  },
  timeout: 300000
};

const serverInstance = axios.create({
  ...axiosConfig,
  baseURL: PLAYLIST_BACKEND_API
});

export { serverInstance };
