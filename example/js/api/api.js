/* eslint-disable */

import io from 'socket.io-client';
import store from '../store/store';

const host = 'ws://glances-example.herokuapp.com';
let socket = null;

function getSocket() {
  if (!socket) socket = io.connect(host);
  return socket;
}

getSocket().on('connect', (data) => {
});

getSocket().on('tiles', (data) => {
  store.dispatch({
    type: 'UPDATE_TIME_CHART',
    data,
  });
});

export default function connect() {
  getSocket();
}
