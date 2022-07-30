const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const {
  User, Room, Role, Users_Room,
} = require('../../db/models');

router.get('/createorguest', checkAuth, async (req, res) => {
  res.sendStatus(200);
});

router.get('/createroom', checkAuth, async (req, res) => {
  const { id } = await req.session.user;
  // console.log(id);
  const userAllnotId = await User.findAll({ where: { id: { [Op.ne]: id } } });
  return res.json(userAllnotId);
});

router.post('/createroom', checkAuth, async (req, res) => {
  console.log(req.body);
  try {
    if (req.body.input && req.body.guest) {
      console.log('tyt');
      const { id } = await req.session.user;
      const { name } = await req.body.input;
      console.log(id, name);
      const newRoom = await Room.create({ roomName: name, user_id: id });
      const updateuser = await User.update({ role_id: 2 }, { where: { id } });
      // console.log('+++++++++++', updateuser);
      const guests = await Users_Room.create({ user_id: req.body.guest.id, room_id: newRoom.id });
      const updateguest = await User.update({ role_id: 3 }, { where: { id: guests.user_id } });
      console.log(updateuser, { guests, raw: true });
      return res.json({ newRoom, guests });
    } res.sendStatus(401);
  } catch (error) {
    res.sendStatus(402);
  }
});

router.get('/join', checkAuth, async (req, res) => {
  const rommAll = await Room.findAll();
  return res.json(rommAll);
});

router.post('/join', checkAuth, async (req, res) => {
  const { id } = req.session.user;
  const updateuser = await User.update({ role_id: 3 }, { where: { id } });
  res.sendStatus(200);
});

module.exports = router;
