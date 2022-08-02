const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const { Track } = require('../../db/models');

router.get('/', checkAuth, async (req, res) => {
  const findAudio = await Track.findAll();
  console.log(findAudio);
  return res.json(findAudio);
});

module.exports = router;
