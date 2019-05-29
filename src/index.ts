import Server from './config/Server';
const { PORT, MONGO_URI } = process.env

const server = new Server(PORT, MONGO_URI);
server.start();

