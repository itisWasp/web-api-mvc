import { User } from '../database/models/`';

import { Role } from '../database/models/role';

exports.createOne = (data) => {
  const created = models.Role.create(data);
  return created;
};

exports.findRole = (data) => {
  const found = Role.findOne({ where: { name: data.name } });
  return found;
};
exports.findRoles = (data) => {
  const foundRoles = Role.findAndCountAll(data);
  return foundRoles;
};

exports.findRoleById = (query) => {
  const role = Role.findOne({ where: { id: query.id } });
  return role;
};

exports.changeRole = (query) => {
  const changes = User.update(
    { roleId: query.change },
    { where: { roleId: query.role_id } }
  );
  return changes;
};
exports.deleteOne = (data) => {
  const deleted = Role.destroy({ where: { id: data } });
  return deleted;
};

exports.roles = async () => {
  const role = await Role.findAll();
  return role;
};
exports.updateRole = async (data, id) => {
  const result = await Role.update(data, { where: { id: id } });
  return result;
};
