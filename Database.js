const mongoose=require('mongoose')
const url ='mongodb+srv://aryantrivedieminence:feXnQRMDLiXUslAN@ecommercestore.87yxwpa.mongodb.net/?retryWrites=true&w=majority;'
const Connection=async()=>{
    try {
     await  mongoose.connect(url,{useNewUrlParser:true}) 
       console.log("Database Connected Successfully")
    } catch (error) {
       console.log("Failure base Connection") 
    }
}


module.exports=Connection