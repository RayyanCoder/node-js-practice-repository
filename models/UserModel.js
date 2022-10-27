const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');



const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        lowercase:true,
        validate:[validator.isEmail,'Please provide valid email address']
    },
    photo:String,
    role:{
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'passwordConfirm is required'],
        validate:{
            validator:function(value){
                return value === this.password;
        },
        message:'Passwords do not match'
    }
}});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password =  await  bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User',userSchema);
module.exports = User;
