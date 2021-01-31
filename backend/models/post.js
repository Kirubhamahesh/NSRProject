const mongoose =require('mongoose')

const postSchema=mongoose.Schema({
    
    type:{type:String,required:true},
    name:{type:String,required:true},
   image:{type:String,required:true},
    estimatedprice:{type:String,required:true},
    price:{type:String,required:true},
    fabric:{type:String,required:true},
    clothtype:{type:String,required:true},
    description:{type:String,required:true},
    extrainfo:{type:String,required:true},
    color:{type:String,required:true}
})

module.exports=mongoose.model("Post",postSchema)



