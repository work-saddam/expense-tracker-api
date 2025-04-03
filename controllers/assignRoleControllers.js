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

exports.assignNewRole = async(req,res)=> {
    try {
        const {role} = req.body;
        if(!role){
            return res.status(400).json("Please enter the role") 
        }else if(!["admin", "manager", "user"].includes(role)){
            return res.status(400).json("Invalid role")
        }
        
        const user = await User.findByIdAndUpdate(req.params.id, {role:role},{new:true})
        res.status(200).json(`${user.firstName} role was changed to ${user.role}`)
    } catch (error) {
        res.status(400).json(error.message)
    }
}