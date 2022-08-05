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

  let arrGuest = [];
  if (guests[0]) {
    arrGuest = guests.map((el) => el['User.userName']);
  }

  return res.json({ nameCreater, nemeRoom, arrGuest });
});

router.delete('/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const infoRoom = await Users_Rooms_Role.findOne({ where: { room_id: +id, role_id: 2 } });
  // console.log(infoRoom.user_id === user.id);
  try {
    if (infoRoom.user_id === user.id) { // удаление комнаты
      const deleteGuest = await Users_Rooms_Role.destroy({ where: { room_id: +id } });
      const deleteTracks = await Rooms_Track.destroy({ where: { room_id: +id } });
      const deleteroom = await Room.destroy({ where: { id: +id } });
      // const updateUser = await User.update({ role_id: null }, { where: { id: user.id } });
      return res.sendStatus(200);
    }
    if (infoRoom.user_id !== user.id) { // выход из комнаты
      const deleteGuest = await Users_Rooms_Role.destroy({
        where:
          { room_id: +id, user_id: user.id },
      });
      // const updateUser = await User.update({ role_id: null }, { where: { id: user.id } });
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(401);
  }
});

module.exports = router;
