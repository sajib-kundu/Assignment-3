const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let Token= req.headers['token-key']
    jwt.verify(Token,"Admin123", function(err,decoded){

        if(err){
            res.status(401).json({status:"Unathorized"});
        }
        else{

            //Get User name From Decoded Token and add with req hadder
            let username = decoded['data']['UserName'];
            req.headers.username=username
            next();
        }
    })
}