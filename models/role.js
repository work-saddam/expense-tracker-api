const hardcodedRoles = require("../helpers/roles.json")

class Roles {
    constructor() {
        this.roles = hardcodedRoles.roles;    //setting the roles
    }

    getRoleByName(name) {
        return this.roles.find((role) => role.name === name)
    }

    getRole(){
        return this.roles;
    }
}

module.exports = Roles;