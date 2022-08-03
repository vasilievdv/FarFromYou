const router = require('express').Router();
const checkAuth = require('../middlewares/checkAuth');
const { Track, Room, Rooms_Track } = require('../../db/models');

router.get('/', checkAuth, async (req, res) => {
  const findAudio = await Track.findAll();
  // console.log(findAudio);
  return res.json(findAudio);
});

// router.post('/:id', checkAuth, async (req, res) => {
//   const { id } = req.params;
// });

router.post('/createtrack', async (req, res) => {
  const { artist, trackName, room_id } = req.body;

  console.log(req.body, req.session.user);
  const { id } = req.session.user;
  try {
    const newAudio = await Track.create({
      trackName, artist, url: 'url', user_id: id,
    });
    const trackQueue = await Rooms_Track.create({
      room_id: +room_id.id,
      track_id: +newAudio.id,
    });


    const arr = [];
    const artistsTracks = audioRoom.map((el) => arr.push([el['Track.artist'], el['Track.trackName']]));
    // console.log('+++++++++++++', artistAll);
    // const tracksName = audioRoom.map((el) => );
    // console.log('----------------', tracksName);
    // console.log('++++++++++++', audioRoom);
    // for (let i = 0; i < tracksName.length; i += 1) {el['Track.trackName']
    //   arr.push([artistAll[i], tracksName[i]]);
    // }
    console.log(arr);
    res.json(arr);
  } catch (er) {
    console.log(er);
  }
});
module.exports = router;
// trackName: DataTypes.STRING,
//     artist: DataTypes.STRING,
//     url: DataTypes.TEXT,
//     user_id: DataTypes.INTEGER,
