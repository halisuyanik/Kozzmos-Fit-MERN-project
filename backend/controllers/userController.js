const AppUser=require('../models/AppUserModel');
const jwt=require('jsonwebtoken');

const generateToken=(_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'2d'})
}

const signinUser=async(req, res)=>{
    const {email, password}=req.body;
    try
    {
        const user=await AppUser.signin(email, password);
        const token=generateToken(user._id);
        res.status(200).json({email, token});
    }
    catch(error)
    {
        res.status(400).json({error: error.message});
    }
}
const signupUser=async(req, res)=>{
    const {email, password}=req.body;
    try
    {
        const user=await AppUser.signup(email, password);
        const token=generateToken(user._id);
        res.status(200).json({email, token});
    }
    catch(error)
    {
        res.status(400).json({error:error.message});
    }
}
const getUser=async(req, res)=>{
    const users=await AppUser.find({});

    res.status(200).json(users);
}
module.exports={signinUser, signupUser,getUser}