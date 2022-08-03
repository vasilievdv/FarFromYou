const router = require('express').Router();
const { Op } = require('sequelize');
const checkAuth = require('../middlewares/checkAuth');
const checkGuestOrAuthor = require('../middlewares/checkGuestOrAuthor');
const {
  Users_Rooms_Role, Room, User,
} = require('../../db/models');

router.get('/:id', checkGuestOrAuthor, async (req, res) => {
  const { id } = req.params;

  const guests = await Users_Rooms_Role.findAll({
    where: { room_id: { [Op.eq]: id }, role_id: { [Op.ne]: 2 } },
    include: [{ model: User }, { model: Room }],
    raw: true,
  });
  const creater = await Users_Rooms_Role.findAll({
    where: { room_id: { [Op.eq]: id }, role_id: 2 },
    include: [{ model: User }, { model: Room }],
    raw: true,
  });
  // console.log('tut');

  const nameCreater = creater[0]['User.userName'];
  const nemeRoom = creater[0]['Room.roomName'];
  // console.log('+++++++', guests[0]);
  let arrGuest = [];
  if (guests[0]) {
    // console.log('555555');
    arrGuest = guests.map((el) => el['User.userName']);
    // console.log({ nameCreater, nemeRoom, arrGuest });
    // return res.json({ nameCreater, nemeRoom, arrGuest });
  }
  // console.log('444444');
  // console.log({ nameCreater, nemeRoom, arrGuest });
  return res.json({ nameCreater, nemeRoom, arrGuest });
});
// console.log(nameCreater, nemeRoom, arrGuest);
// const idGuoists = guests.map((el) => el.id);
// const info = await Room.findOne({ where: { id } });
// const authorRoom = await User.findOne({ where: { id: info.user_id } });
// console.log('_________', guests, creater);
//   const res1 = idUser.filter((el) => el.id === idGuoists.el);
//   const info = await User.findAll({ where: { id: idGuoists.map((el) => el) } });
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
