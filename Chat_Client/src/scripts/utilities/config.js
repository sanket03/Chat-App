import io from 'socket.io-client';
const config = {};
config.url = 'http://localhost:8000';
config.socket = io(config.url);

export default config;