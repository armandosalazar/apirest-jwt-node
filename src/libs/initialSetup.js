import Role from '../models/Role';

export async function createRoles() {
  const count = await Role.countDocuments();
  if (count === 0) {
    const roles = await Promise.all([
      Role.create({ name: 'user' }),
      Role.create({ name: 'moderator' }),
      Role.create({ name: 'admin' }),
    ]);
    console.log(`Created ${roles.length} roles`);
    console.log(roles);
  }
}
