const jwt=require('jsonwebtoken');
const secretKey='Iamironmanbutwithatwistthatiambuiltdifferent'

function createToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
        name:user.fullName,
    }
    const token=jwt.sign(payload,secretKey);
    return token;
}

function validateToken(token){
    const user=jwt.verify(token,secretKey);
    if(user) return user;
    else return null;
}

module.exports={createToken,validateToken};