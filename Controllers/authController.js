const User = require('./../models/UserModel');
const jwt  = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const AppError = require('./../utils/appError');


const signToke = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async(req,res,next)=>{
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
    });

    const token = signToke(newUsr.id);
    res.status(201).json({
        message:'success',
        token,
        data:{
            user:newUser
        }
    })

});

exports.login = catchAsync(async(req,res,next)=>{

    const {email,password} = req.body;
    if(!email || !password){
        next(new AppError('Please provide a valid email and password',400));
    }

    const getUser = await User.findOne({email}).select('+password');
    console.log(getUser);

    correctUser = await getUser.corectPassword(password,getUser.password);

    if(!getUser || !correctUser){
        return(next(new AppError('incorrect email or password',401)));
    }

    const token = signToke(getUser.id);
    res.status(200).json({
        status: 'success',
        token

    })

});

exports.protect = catchAsync(async(req,res,next)=>{
    let token='';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new AppError('Please login to access it ',401));
    }
    console.log('hello world',token);
    next();
});
