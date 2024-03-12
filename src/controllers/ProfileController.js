const ProfileModel = require('../models/ProfileModel');
const jwt = require('jsonwebtoken');


// User Registration Controller 
exports.CreateProfile= (req,res)=>{

     let reqBody = req.body;
     ProfileModel.create(reqBody,(err,data)=>{

        if(err){
            res.status(400).json({status:"Fail", data:err})

        }

        else{
            res.status(201).json({status:"Success", data:data})
        }
     })
 }
 

// User Login 
exports.UserLogin= (req,res)=>{

    let UserName=req.body['UserName'];
    let Password=req.body['Password'];
    
    ProfileModel.find({UserName:UserName, Password:Password},(err,data)=>{

        if(err){
            res.status(400).json({status:"Fail", data:err})

        }
        else{
            if(data.length>0){
                //Create Auth Token
                let payload ={
                    // Token expire after 30 days
                    exp:Math.floor(Date.now()/1000) + (30*24*60*60),
                    data:data[0]
                }
                let token = jwt.sign(payload,"Admin123")
                // end of token creation
                res.status(200).json({status:"Success",token:token, data:data})
            }
            else{
                res.status(401).json({status:"Unathorized"})
            }

        }
    })
   } 

   // User Profile Read
    exports.SelectProfile=(req,res)=>{
        let UserName=req.headers['username']
        //let UserName="sajib"
        ProfileModel.find({UserName:UserName},(err,data)=>{
            if(err){
                res.status(400).json({status:"Fail", data:err});
            }
            else{
               
                res.status(200).json({status:"Success", data:data})
        }

        })
    }


// User Profile Update

exports.UpdateProfile=(req,res)=>{
    let UserName=req.headers['username']
    let UpdateData = req.body;
    
    ProfileModel.updateOne({UserName:UserName},UpdateData,(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err});
        }
        else{
           
            res.status(200).json({status:"Success", data:data})
    }

    });

    

}

   
/*
exports.CreateProfile= async (req,res)=>{
    
   try {
    let reqBody = req.body;
    const data = await ProfileModel.create(reqBody);
    res.status(201).json({status:"Success", data:data})
    
   } 
   catch (error) {
    res.status(400).json({status:"Fail", data:error.message})
    
   }

}

*/
/*
exports.UserLogin= (req,res)=>{
    
        
     let UserName=req.body['UserName'];
     let Password=req.body['Password'];
     res.status(201).json({status:"Success", data:UserName});

    } 
    
    catch (error) {
        res.status(400).json({status:"Fail", data:error.message})
 
    }
 }

 */
/*
 exports.UserLogin = async (req, res) => {
    try {
        let UserName = req.body['UserName'];
        let Password = req.body['Password'];
        
        const data = await showData(UserName, Password)
        
        res.status(201).json({status: "Success", data: data});
    } catch (error) {
        res.status(400).json({status: "Fail", data: error.message});
    }
};
*/


