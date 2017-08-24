import io from 'socket.io-client';
const config = {};

// Configure Service URL
config.url = 'http://localhost:8000';

// Initialise socketio client
config.socket = io(config.url);

export default config;