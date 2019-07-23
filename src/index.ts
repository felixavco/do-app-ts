import Server from './config/Server';
const { PORT } = process.env

const server = new Server(PORT);
server.start();

