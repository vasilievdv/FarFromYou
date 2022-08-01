const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const {
  User, Room, Users_Room,
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
    if (req.body.name) {
      console.log('tyt');
      const { id } = await req.session.user;
      const { name } = await req.body;
      console.log(id, name);
      const newRoom = await Room.create({ roomName: name, user_id: id });
      console.log('+++++++++++', newRoom.id);
      const createrUser = await User.update({ role_id: 2 }, { where: { id } });
      console.log('+++++++++++', createrUser);
      console.log(newRoom.id);
      return res.json({ id: newRoom.id });
    } return res.sendStatus(402);
  } catch (error) {
    return res.sendStatus(401);
  }
});

router.get('/join', checkAuth, async (req, res) => {
  const rommAll = await Room.findAll();
  return res.json(rommAll);
});

router.post('/join', checkAuth, async (req, res) => {
  console.log(req.body);
  const { id } = await req.body;
  try {
    if (id) {
      const updateuser = await User.update({ role_id: 3 }, { where: { id: req.session.user.id } });
      const guests = await Users_Room.create({ user_id: req.session.user.id, room_id: id });
      console.log(updateuser, guests);
      return res.sendStatus(200);
    } return res.sendStatus(402);
  } catch (error) {
    return res.sendStatus(401);
  }
});

module.exports = router;
