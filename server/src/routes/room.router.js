const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const { Users_Room, Room, User } = require('../../db/models');

router.get('/:id', checkAuth, async (req, res) => {
  console.log('tyhhhhht');
  const { id } = req.params;
  console.log('++++++++++', id);
  const guests = await Users_Room.findAll({
    where: { room_id: { [Op.eq]: id } },
    raw: true,
  });
  console.log('ddddddddddddd', guests);
  const idGuoists = guests.map((el) => el.id);
  console.log('vvvvvvvvvvvvvv', idGuoists);
  const info = await Room.findOne({ where: { id } });
  const authorRoom = await User.findOne({ where: { id: info.user_id } });
  console.log('mmmmmmmmmmmmm', info);
  //   console.log(idUser);
  //   const res1 = idUser.filter((el) => el.id === idGuoists.el);
  //   const info = await User.findAll({ where: { id: idGuoists.map((el) => el) } });
  res.json({ guests, info, authorRoom });
});
// el['User.id, User.name']
module.exports = router;
