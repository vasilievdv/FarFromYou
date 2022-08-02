const { Router } = require('express');
const filenameMiddleware = require('../middleware/file');

const router = Router();
// filenameMiddleware.single('audiofile')
router.post('/upload', filenameMiddleware.single('audiofile'), (req, res) => {
  try {
    if (req.file) {
      console.log(req.file, '/////////////////');
      res.json(req.file);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
