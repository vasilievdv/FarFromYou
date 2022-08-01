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
  //   console.log(idUser);
  //   const res1 = idUser.filter((el) => el.id === idGuoists.el);
  //   const info = await User.findAll({ where: { id: idGuoists.map((el) => el) } });
  res.json({ guests, info, authorRoom });
});
// el['User.id, User.name']

router.delete('/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  // console.log(id);
  const infoRoom = await Room.findOne({ where: { id: +id } });
  // console.log(infoRoom);

  try {
    if (infoRoom.user_id === user.id) { // удаление комнаты
      const deleteGuest = await Users_Room.destroy({ where: { room_id: +id } });
      const deleteroom = await Room.destroy({ where: { id: +id } });
      const updateUser = await User.update({ role_id: null }, { where: { id: user.id } });
      return res.sendStatus(200);
    }
    if (infoRoom.user_id !== user.id) { // выход из комнаты
      const deleteGuest = await Users_Room.destroy({ where: { room_id: +id } });
      const updateUser = await User.update({ role_id: null }, { where: { id: user.id } });
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(401);
  }
});

module.exports = router;
