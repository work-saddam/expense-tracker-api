const Role = require("../models/role")
const Permission = require("../models/permission");

exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : "anonymous";
    // console.log(userRole)
    const userPermission = new Permission().getPermissionByRoleName(userRole);
    // console.log(userPermission)
    // console.log(userPermission, typeof userPermission);


    if(Object.values(userPermission).includes(permission)){
        return next();
    }else{
        res.status(403).json({error: "Access denied"})
    }
  };
};
