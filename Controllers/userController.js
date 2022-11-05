const User = require('./../models/UserModel');
const catchAsync = require('./../utils/catchAsync');
const Validator = require('validator');

exports.getAllUser=catchAsync(async(req,res,next)=>{
    const allUsers = await User.find();

    res.status(200).json({
        status: 'success',
        data:{
            users:allUsers
        }
    });
});

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
