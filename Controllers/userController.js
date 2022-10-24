const User = require('./../models/UserModel');
const Validator = require('validator');

exports.getAllUser=(req,res,next)=>{
    res.status(400).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

exports.getUser =(req,res,next)=>{
    res.status(400).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}

exports.createUser = async (req,res,next)=>{

    const user = await User.create(req.body);
    res.status(400).json({
        status: 'success full register',
        data:{
            Users:user
        }
    });
}
exports.updateUser = (req,res,next)=>{
    res.status(400).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}
exports.deleteUser = (req,res,next)=>{
    res.status(400).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
}
