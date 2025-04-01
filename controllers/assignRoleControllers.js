const User = require("../models/user")

exports.getRole = async (req,res)=>{
try {
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).json("user not found")
    }
    userRole = user.role;
    res.status(200).json(`${user.firstName} is ${userRole}`)
} catch (error) {
    res.status(400).json(error.message);
}
}
