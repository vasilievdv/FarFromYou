require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // app.use(cors(corsOptions));

const server = http.createServer(app);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);
async function base() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
base();

const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  // socket.on('send_message', (data) => {
  //   console.log(data);
  // });
});

server.listen(PORT, () => console.log('Server has been started on port 3001'));
