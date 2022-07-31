require('dotenv').config();
const express = require('express');

// sign
const { Server } = require('socket.io');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const http = require('http');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const welcomeRouter = require('./src/routes/welcome.router');
const authRouter = require('./src/routes/auth.router');
const usersRouter = require('./src/routes/users.router');
const roomRouter = require('./src/routes/room.touter');

const app = express();
const PORT = process.env.PORT || 3001;

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

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions)); // app.use(cors(corsOptions));

// sign
const { COOKIE_SECRET, COOKIE_NAME } = process.env;

app.set('cookieName', COOKIE_NAME);

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sign
app.use(
  session({
    name: app.get('cookieName'),
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
    },
  }),
);
app.use('/', welcomeRouter);
app.use('/:id/:roomName', roomRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

const server = http.createServer(app);
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
