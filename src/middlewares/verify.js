import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export async function verifyToken(req, res, next) {
  // if (!req.headers.authorization) {
  //   return res.json({ message: 'No token provided' });
  // }
  // const token = req.headers.authorization.split(' ')[1];

  const token = req.headers['x-access-token'];

  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  try {
    var decoded = jwt.verify(token, config.SECRET);
    // Esto hace que el siguiente midelware pueda acceder a la información del usuario
    // en este caso por medio de request al id.
    req.id = decoded.id;
  } catch (error) {
    return res
      .status(401)
      .send({ auth: false, message: 'Failed to authenticate token.' });
  }

  const user = await User.findById(decoded.id, { password: 0 });

  if (!user)
    return res.status(404).send({ auth: false, message: 'No user found.' });

  return next();
}

export async function verifyAdmin(req, res, next) {
  const user = await User.findById(req.id, { password: 0 });
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      return next();
    }
  }
  return res.status(403).send({ message: 'Unauthorized' });
}

export async function verifyModerator(req, res, next) {
  const user = await User.findById(req.id, { password: 0 });
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'moderator') {
      return next();
    }
  }
  return res.status(403).send({ message: 'Unauthorized' });
}
