import User from '../models/User';
import Role from '../models/Role';

export async function getUsers(req, res) {
  const users = await User.find({}, { password: 0 });
  res.json(users);
}

export async function createUser(req, res) {
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
  const userCreated = await user.save();
  res.json(userCreated);
}
