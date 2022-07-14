import { ROLES } from '../models/Role';
import User from '../models/User';

export function verifyDuplicateUsernameOrEmail(req, res, next) {
  const { username, email } = req.body;
  const user = User.findOne({
    $or: [{ username }, { email }],
  });
  if (user) {
    return res
      .status(400)
      .json({ message: 'Username or email already exists' });
  }
  return next();
}

export function verifyRoleExist(req, res, next) {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(400)
          .send({ message: `Invalid role ${req.body.roles[i]}.` });
      }
    }
  }
  return next();
}
