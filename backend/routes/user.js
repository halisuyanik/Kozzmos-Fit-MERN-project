const express=require('express');
const router=express.Router();
const {signinUser, signupUser, getUser}=require('../controllers/userController');

router.post('/signin',signinUser);

router.post('/signup',signupUser);

router.get('/',getUser);
module.exports=router;