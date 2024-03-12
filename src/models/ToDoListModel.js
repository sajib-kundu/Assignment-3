const mongoose = require('mongoose');

const DataSchema = mongoose.Schema ({
    
    UserName:{type:String,required:true},
    ToDoSubject:{type:String,required:true},
    ToDoDescription:{type:String,required:true},
    ToDoStatus:{type:String,default: 'New'},
    ToDoCreateDate:{type:Date,default: Date.now},
    ToDoUpdateDate:{type:Date}
    

},{versionKey:false});

const ToDoListModel = mongoose.model('todolists',DataSchema);

module.exports = ToDoListModel;