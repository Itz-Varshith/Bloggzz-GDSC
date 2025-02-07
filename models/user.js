const {Schema, model}=require('mongoose');
const {createHmac,randomBytes}=require('crypto')
const {createToken,validateToken}=require("../Services/auth");


const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    },
    profileImageUrl:{
        type:String,
    },
    role:{
        type:String,
        enum:['author','viewer'],
        default:'viewer',
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true,
    }
},{timestamps:true});


userSchema.pre('save',function (next){
    const user=this;
    if(!user.isModified('password')) return next();
    user.salt=randomBytes(16).toString('hex');
    const hashedPassword=createHmac('sha256',user.salt)
    .update(user.password)
    .digest("hex");
    this.salt=user.salt;
    this.password=hashedPassword;
    if(this.gender=='male'){
        this.profileImageUrl='/images/maleUser.png';
    }
    else{
        this.profileImageUrl='/images/femaleUser.png';
    }
    next();
})

userSchema.static('matchPasswordandGenerateToken',async function (email,password){
    const userLogin=await User.findOne({email});
    const hashedPassword=createHmac('sha256',userLogin.salt).update(password).digest('hex');
    if(hashedPassword===userLogin.password) {
        const token=createToken(userLogin);
        return token;
    }
    if(hashedPassword!==userLogin.password) return null;
})


const User=model('user',userSchema);

module.exports=User;