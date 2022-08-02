const multer = require('multer');
const { Track } = require('../db/models');

const DB = [];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'audio/');
  },
  filename(req, file, cb) {
    console.log(file);
    const name = `${new Date().toISOString()}-${file.originalname}`;
    cb(null, name);
    DB.push(name);
    const findAudio = Track.findOne({ where: { url: 'url' } });
    const updateAuidio = findAudio.update({ url: name });
  },
});

const allowedMimeTypes = ['audio/wav', 'audio/mp3'];

const filter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, false);
  }
  cb(null, true);
};

module.exports = multer({ storage, filter });
module.exports.DB = DB;
