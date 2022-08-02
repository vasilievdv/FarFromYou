const { Router } = require('express');
// const path = require('path');
const { DB } = require('../middleware/file');

const router = Router();

router.get('/getAudio', (req, res) => {
  // res.sendFile(path.join(__dirname, '../audio', DB[0]));
  res.json(DB);
});

module.exports = router;
