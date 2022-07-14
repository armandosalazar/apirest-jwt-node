import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export async function signUp(req, res) {
  const { username, email, password, roles } = req.body;
  const user = new User({
    username,
    email,
    password: User.encryptPassword(password),
  });
  if (roles) {
    const rolesOfUser = await Role.find({ name: { $in: roles } });
    user.roles = rolesOfUser.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    user.roles = [role._id];
  }
  const userSaved = await user.save();
  const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
    expiresIn: 300, // 1 dia
  });
  res.json({ token });
}

export async function signIn(req, res) {
  const user = await User.findOne({ email: req.body.email }).populate('roles');
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const match = User.comparePassword(req.body.password, user.password);
  if (!match) {
    return res.status(401).json({ token: null, message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user._id }, config.SECRET, {
    expiresIn: 300, // 1 dia
  });
  res.json({ token });
}
