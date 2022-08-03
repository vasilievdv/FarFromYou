const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const { Track, Room, Rooms_Track } = require('../../db/models');

router.get('/', checkAuth, async (req, res) => {
  const { id } = req.session.user;
  const findAllAudio = await Track.findAll({ where: { user_id: id } });
  // console.log(findAudio);
  return res.json(findAllAudio);
});

module.exports = router;
