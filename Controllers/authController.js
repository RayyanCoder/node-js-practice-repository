const User = require('./../models/UserModel');
const {promisify} = require('util');
const jwt  = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const AppError = require('./../utils/appError');
const { token } = require('morgan');



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

    // console.log(signToke(newUser.id));
    console.log(newUser);

    const token = signToke(newUser.id);
//    const token="rr";
    res.status(201).json({
        message:'success',
        token,
        data:{
            user:newUser
        }
    });

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

    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    console.log("decoded data ",decoded);

    const freshUser = await user.find(decoded.id);
    if(!freshUser){
        return next(new AppError('The token belonging to this user does not exist',401));
    }

    if(freshUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password please login again',401));
    };
    next();
});
