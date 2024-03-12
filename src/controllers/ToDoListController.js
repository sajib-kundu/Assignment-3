const ToDoListModel = require('../models/ToDoListModel');
const jwt = require('jsonwebtoken');



// ToDo creation 
exports.CreateToDo= (req,res)=>{

    let reqBody = req.body;

    let UserName=req.headers['username']
    let ToDoSubject=reqBody['ToDoSubject']
    let ToDoDescription=reqBody['ToDoDescription']
    let ToDoStatus= "New"
    let ToDoCreateDate = Date.now();
    let ToDoUpdateDate = Date.now();

    let PostBody={
    UserName:UserName,
    ToDoSubject:ToDoSubject,
    ToDoDescription:ToDoDescription,
    ToDoStatus:ToDoStatus,
    ToDoCreateDate:ToDoCreateDate,
    ToDoUpdateDate:ToDoUpdateDate
    }

    ToDoListModel.create(PostBody,(err,data)=>{

       if(err){
           res.status(400).json({status:"Fail", data:err})

       }

       else{
           res.status(201).json({status:"Success", data:data})
       }
    })
}


// ToDo Select
exports.SelectToDo=(req,res)=>{
    let UserName=req.headers['username']
    //let UserName="sajib"
    ToDoListModel.find({UserName:UserName},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err});
        }
        else{
           
            res.status(200).json({status:"Success", data:data})
    }

    })
}

// ToDo List Update
exports.UpdateToDo=(req,res)=>{
   
    let ToDoSubject=req.body['ToDoSubject']
    let ToDoDescription=req.body['ToDoDescription']
    let _id =req.body['_id']
    let ToDoUpdateDate = Date.now();

    let PostBody={
      
        ToDoSubject:ToDoSubject,
        ToDoDescription:ToDoDescription,
        ToDoUpdateDate:ToDoUpdateDate
        }

        ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upset:true},(err,data)=>{
           
            
                //ToDoListModel.updateOne({_id:_id},PostBody,(err,data)=>{
            if(err){
                
                res.status(400).json({status:"Fail", data:err});
                
            }
            else{
                
                res.status(200).json({status:"Success", data:data})
                
        }

        })
    
}

// ToDo  Status Update
exports.UpdateStatusToDo=(req,res)=>{
    
    let ToDoStatus=req.body['ToDoStatus']
    let _id =req.body['_id']
    let ToDoUpdateDate = Date.now();

    let PostBody={
      
        ToDoStatus:ToDoStatus,
        ToDoUpdateDate:ToDoUpdateDate
        }

        ToDoListModel.updateOne({_id:_id},{$set:PostBody},{upset:true},(err,data)=>{
           
            if(err){
               
                res.status(400).json({status:"Fail", data:err});
                
            }
            else{
                
                res.status(200).json({status:"Success", data:data})
                
        }

        })
    
}

// ToDo   Remove
exports.RemoveToDo=(req,res)=>{
    
    let _id =req.body['_id']
   
        ToDoListModel.remove({_id:_id},(err,data)=>{
           
            if(err){
              
                res.status(400).json({status:"Fail", data:err});
                
            }
            else{
                console.log("three")
                res.status(200).json({status:"Success", data:data})
                
        }

        })
    
}
/*

// ToDo Select by Status
exports.SelectToDoByStatus=(req,res)=>{
    
    let UserName=req.headers['username']
    let ToDoStatus=req.body['ToDoStatus']

   
    ToDoListModel.find({UserName:UserName, ToDoStatus:ToDoStatus},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err});
        }
        else{
           
            res.status(200).json({status:"Success", data:data})
    }

    })
}


// ToDo Select by Date
exports.SelectToDoByDate=(req,res)=>{
    
    let UserName=req.headers['username']
    let FormDate=req.body['FormDate']
    let ToDate=req.body['ToDate']
    console.log(FormDate);
    console.log(ToDate)
    // $gte:new Date(ToDate)
    // db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
    // ToDoCreateDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}
    // UserName:UserName,

    ToDoListModel.find({UserName:UserName,ToDoCreateDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail", data:err});
        }
        else{
           
            res.status(200).json({status:"Success", data:data})
    }

    })
}
*/