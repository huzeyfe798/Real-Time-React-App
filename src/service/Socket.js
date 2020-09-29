import io from 'socket.io-client';

const socket = io.connect('wss://socket.cryptoindexseries.com');

export default socket
