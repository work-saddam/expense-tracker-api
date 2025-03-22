const hardcodedRoles = require("../helpers/roles.json");

class Permissions {
  constructor() {
    this.Permission = [];
  }

  getPermissionByRoleName(roleName) {
    const role =  hardcodedRoles.roles.find((r) => r.name === roleName);
    return role ? role.permission : [];
  }
}

module.exports = Permissions 