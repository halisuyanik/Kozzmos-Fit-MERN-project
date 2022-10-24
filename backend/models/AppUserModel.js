const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const hashbcrypt=require('bcrypt');
const validator=require('validator');

const AppUserSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});
AppUserSchema.statics.signup=async function(email, password){
    const available=await this.findOne({email});

    if(!email || !password){throw Error('Alanlar boş bırakılamaz.')};
    if(!validator.isEmail(email)){throw Error('Geçersiz email adresi.')};
    if(!validator.isStrongPassword(password, {
        minLength: 8, minNumbers: 1, minSymbols: 1
    })){throw Error('Şifre güçlü olmalıdır [En az 8 karakter, en az bir büyük harf, en az bir sembol içermelidir.]')};
    
    if(available){throw Error('Böyle bir email daha önce kullanılmış.');}
    const bcryptsalt=await hashbcrypt.genSalt(10);
    const hash=await hashbcrypt.hash(password, bcryptsalt);
    const user=await this.create({email, password:hash});
    return user;
}
AppUserSchema.statics.signin=async function(email, password){
    if(!email ||!password){throw Error('Alanlar boş bırakılamaz.')}
    const user =await this.findOne({email})
    if(!user){throw Error('Geçersiz email.')}
    const equal=await hashbcrypt.compare(password, user.password);
    if(!equal){throw Error('Geçersiz şifre.')}
    return user;
}
module.exports=mongoose.model('AppUser', AppUserSchema)