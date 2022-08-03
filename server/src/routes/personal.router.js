const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const { Track, Room, Users_Rooms_Role } = require('../../db/models');

router.get('/PA', checkAuth, async (req, res) => {
  const { id } = req.session.user;
  const findAllRoom = await Users_Rooms_Role.findAll({
    where: { user_id: id, role_id: 2 },
    include: { model: Room },
    raw: true,
  });

  const findAllAudio = await Track.findAll({ where: { user_id: id }, raw: true });
  const nameRooms = findAllRoom.map((el) => el['Room.roomName']);
  const nameTracks = findAllAudio.map((el) => el.trackName);
  console.log(nameTracks, nameRooms);

  return res.json({ nameTracks, nameRooms });
});

module.exports = router;
