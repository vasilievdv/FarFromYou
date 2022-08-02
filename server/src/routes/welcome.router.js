const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const {
  User, Room, Users_Rooms_Role,
} = require('../../db/models');

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
  console.log(req.body);
  try {
    if (req.body.name) {
      const { id } = await req.session.user;
      const { name } = await req.body;
      console.log('welcome router back', name);
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
    console.log('in catch', error.message);
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
  const infoRoom = await Users_Rooms_Role.findOne({ where: { room_id: +id, role_id: 2 } });
  try {
    if (infoRoom.user_id === user.id) {
      return res.sendStatus(403);
    }
    if (infoRoom.user_id !== user.id) {
      // const updateuser = await Users_Rooms_Role.update({ role_id: 3 },
      //  { where: { id: req.session.user.id } });
      const [guests, created] = await Users_Rooms_Role.findOrCreate({
        where: {
          user_id: user.id,
          room_id: +id,
          role_id: 3,
        },
      });
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(401);
  }
});

module.exports = router;
