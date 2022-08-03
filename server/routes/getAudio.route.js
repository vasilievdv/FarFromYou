const { Router } = require('express');
// const path = require('path');
const { DB } = require('../middleware/file');
const { Track } = require('../db/models');

const roomTracks = Track.findeAll()

const router = Router();

router.get('/getAudio', (req, res) => {
  res.json(DB);
});

module.exports = router;
