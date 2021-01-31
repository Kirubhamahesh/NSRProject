const mongoose =require('mongoose')

const orderSchema=mongoose.Schema({

    userid:{type:String,required:true},
    prodname:{type:String,required:true},
    address:{type:String,required:true},
    Quantity:{type:Number,required:true},
    prodid:{type:String,required:true},
    image:{type:String,required:true},
    contactNumber:{type:Number,required:true},

    
})

module.exports=mongoose.model("Order",orderSchema)