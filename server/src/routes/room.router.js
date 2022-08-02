const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const {
  Users_Rooms_Role, Room, User,
} = require('../../db/models');

router.get('/:id', checkAuth, async (req, res) => {
  const { id } = req.params;

  const guests = await Users_Rooms_Role.findAll({
    where: { room_id: { [Op.eq]: id }, role_id: { [Op.ne]: 2 } },
    include: [{ model: User }, { model: Room }],
    raw: true,
  });
  // const idGuoists = guests.map((el) => el.id);
  // const info = await Room.findOne({ where: { id } });
  // const authorRoom = await User.findOne({ where: { id: info.user_id } });
  console.log(guests);
  //   const res1 = idUser.filter((el) => el.id === idGuoists.el);
  //   const info = await User.findAll({ where: { id: idGuoists.map((el) => el) } });
  res.json({ guests });
});
// el['User.id, User.name']

router.delete('/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  // console.log(id);
  const infoRoom = await Users_Rooms_Role.findOne({ where: { id: +id, role_id: 2 } });
  // console.log(infoRoom);

  try {
    if (infoRoom.user_id === user.id) { // удаление комнаты
      const deleteGuest = await Users_Rooms_Role.destroy({ where: { room_id: +id } });
      const deleteroom = await Room.destroy({ where: { id: +id } });
      // const updateUser = await User.update({ role_id: null }, { where: { id: user.id } });
      return res.sendStatus(200);
    }
    if (infoRoom.user_id !== user.id) { // выход из комнаты
      const deleteGuest = await Users_Rooms_Role.destroy({ where: { room_id: +id } });
      // const updateUser = await User.update({ role_id: null }, { where: { id: user.id } });
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(401);
  }
});

module.exports = router;
