const {
  Users_Rooms_Role,
} = require('../../db/models');

const checkGuestOrAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.session;
  const find = await Users_Rooms_Role.findOne({ where: { room_id: id, user_id: user.id } });
  if (find) {
    return next();
  }
  console.log('find', find);
  return res.sendStatus(405);
};
module.exports = checkGuestOrAuthor;
