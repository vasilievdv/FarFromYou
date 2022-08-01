const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const { Users_Room, Room, User } = require('../../db/models');

router.get('/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const guests = await Users_Room.findAll({
    where: { room_id: { [Op.eq]: id } },
    raw: true,
  });

  const idGuoists = guests.map((el) => el.id);
  const info = await Room.findOne({ where: { id } });
  const authorRoom = await User.findOne({ where: { id: info.user_id } });
  res.json({ guests, info, authorRoom });
});
module.exports = router;
