const {
  Users_Rooms_Role,
} = require('../../db/models');

const checkGuestOrAuthor = async (req, res, next) => {
  if (req.session.user) {
    const { id } = req.params;
    const { user } = req.session;
    const find = await Users_Rooms_Role.findOne({ where: { room_id: id, user_id: user.id } });
    if (find) {
      return next();
    }
  }
  return res.sendStatus(405);
};
module.exports = checkGuestOrAuthor;
