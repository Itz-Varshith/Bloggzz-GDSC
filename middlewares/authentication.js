const {createToken,validateToken}=require('../Services/auth');


function checkForAuthenticationCookie(cookie){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookie];
        if(!tokenCookieValue){
            return next();
        }
        try {
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload;
            return next();
        } catch (error) {
            return next();
        }
    }
}

module.exports={checkForAuthenticationCookie};