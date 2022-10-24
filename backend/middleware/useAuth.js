const AppUser=require('../models/AppUserModel');
const jwt=require('jsonwebtoken');


const useAuth=async (req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:'Token oluşturulamadı.'});
    }
    const token=authorization.split(' ')[1];
    try{
        const {_id}=jwt.verify(token, process.env.SECRET);
        req.user=await AppUser.findOne({_id}).select('_id');
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({error:'Lütfen giriş yapınız.'})
    }
}
module.exports=useAuth;