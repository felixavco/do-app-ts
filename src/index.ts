import Server from './config/Server';
if(process.env.NODE_ENV !== "production") require('dotenv').config();

const server = new Server(process.env.PORT, process.env.MONGO_URI);
server.start();

