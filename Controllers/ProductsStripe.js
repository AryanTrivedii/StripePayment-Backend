const stripe = require('stripe')("sk_test_51Ofg1NSD713Gba2a8ljDNgELuDUNNKkG5N5ausUqfjIxYXxnG4iC2Tt73qOKdl01riAVu1LwQTFIqbE1g5ES9iNh00Nh11x0IH");
const [basic, premium, business] = ['price_1OfgZFSD713Gba2ac7phjrww', 'price_1Ofge7SD713Gba2ai5nA8rjs', 'price_1OfghJSD713Gba2a1SIF6pPP'];

const subscription=require('../models/Subscriptions')
const creatProduct=async(req,res)=>{
    try {
        const { name, unit_amount, currency, recurring } = req.body;

        const product = await stripe.products.create({
          name,
          type: 'service',
        });
    
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount,
          currency,
          recurring,
        });
      console.log("Product added Successfully")
        return res.json({ product, price }); 
    } catch (error) {
        console.log("error in the order Api")
    }
}


const getproductById=async(req,res)=>{
 const {productId}=req.body
try {
const product = await stripe.products.retrieve(productId);
    console.log('Product:', product);
    return product;
} catch (error) {
    console.log(error)
    res.json({error})
}
}

const getProducts=async(req,res)=>{
try {
 const products= await stripe.products.list({limit:4})  
 console.log("Products listed Successfully") 
 return res.json({products})
} catch (error) {
 console.log(error)   
 res.json(error)
}}


const deleteProduct=async(req,res)=>{
    const {productId}=req.body
    try {
     const delproduct= await stripe.products.del(productId) 
     console.log(delproduct)
     res.json(201).json({message:deleteProduct})  
    } catch (error) {
      console.log(error)  
      res.json(error)
    }
}


const updateProduct=async(req,res)=>{
  const {productId}=req.body
  try {
   

  } catch (error) {
    console.log(error)
    res.json({message:error})
  }
}




module.exports={creatProduct,getProducts,getproductById,deleteProduct}