const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const { User, Room } = require('../../db/models');

router.get('/createorguest', checkAuth, async (req, res) => {
  res.sendStatus(200);
});

router.get('/createroom', checkAuth, async (req, res) => {
  const { id } = await req.session.user;
  console.log(id);
  const userAllnotId = await User.findAll({ where: { id: { [Op.ne]: id } } });
  return res.json(userAllnotId);
});

router.get('/join', checkAuth, async (req, res) => {
  const rommAll = await Room.findAll();
  return res.json(rommAll);
});

module.exports = router;
