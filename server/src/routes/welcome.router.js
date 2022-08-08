const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const {
  User, Room, Users_Rooms_Role,
} = require('../../db/models');

router.get('/', checkAuth, async (req, res) => {
  res.sendStatus(200);
});

router.get('/createorguest', checkAuth, async (req, res) => {
  res.sendStatus(200);
});

// router.get('/createroom', checkAuth, async (req, res) => {
//   const { id } = await req.session.user;
//   // console.log(id);
//   // const userAllnotId = await User.findAll({ where: { id: { [Op.ne]: id } } });
//   return res.json(userAllnotId);
// });

router.post('/createroom', checkAuth, async (req, res) => {
  try {
    if (req.body.name) {
      const { id } = await req.session.user;
      const { name } = await req.body;
      const newRoom = await Room.create({ roomName: name });

      const createrUser = await Users_Rooms_Role.create({
        user_id: id,
        room_id: newRoom.id,
        role_id: 2,
      });
      // await User.update({ role_id: 2 }, { where: { id } });
      return res.json({ id: newRoom.id });
    } return res.sendStatus(402);
  } catch (error) {
    console.log('in catch blabla', error.message);
    return res.sendStatus(401);
  }
});

router.get('/join', checkAuth, async (req, res) => {
  const rommAll = await Room.findAll();
  return res.json(rommAll);
});

router.post('/join', checkAuth, async (req, res) => {
  const { id } = await req.body;
  const { user } = req.session;
  const infoRoom = await Users_Rooms_Role.findOne({
    where: { room_id: +id, role_id: 2 },
    include: { model: User },
    raw: true,
  });
  // Dima
  const userNames = await Users_Rooms_Role.findAll({
    where: { room_id: id },
    include: { model: User },
  });
  console.log(userNames.User);
  try {
    if (infoRoom.user_id === user.id) {
      // console.log('......');
      // return res.sendStatus(200);
      const justNames = userNames.map((el) => el.User.userName);
      // console.log('bbbbbbbbbbbb', justNames);
      const guestsNames = justNames.filter((el) => el !== infoRoom['User.userName']);
      console.log('guestsNames11111111111111112121212',guestsNames);
      return res.json(guestsNames);
    }
    if (infoRoom.user_id !== user.id) {
      const [guests, created] = await Users_Rooms_Role.findOrCreate({
        where: {
          user_id: user.id,
          room_id: +id,
          role_id: 3,
        },
        include: { model: User },
      });
      // console.log('55555555555', guests.User);
      const justNames = userNames.map((el) => el.User.userName);
      // console.log('bbbbbbbbbbbb', justNames);
      const guestsNames = justNames.filter((el) => el !== infoRoom['User.userName']);
      // console.log(guestsNames);
      return res.json(guestsNames);
      // Dima
      //

      // Arina
      // return res.sendStatus(200);
      //
    }
  } catch (error) {
    return res.sendStatus(401);
  }
});

module.exports = router;
