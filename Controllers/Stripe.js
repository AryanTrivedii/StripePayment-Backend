const stripe = require('stripe')("sk_test_51Ofg1NSD713Gba2a8ljDNgELuDUNNKkG5N5ausUqfjIxYXxnG4iC2Tt73qOKdl01riAVu1LwQTFIqbE1g5ES9iNh00Nh11x0IH")
const [basic,premium,business]=['price_1OfgZFSD713Gba2ac7phjrww','price_1Ofge7SD713Gba2ai5nA8rjs','price_1OfghJSD713Gba2a1SIF6pPP']


const stripeSession = async(plan) => {
  try {
      const session = await stripe.checkout.sessions.create({
          mode: "subscription",
          payment_method_types: ["card"],
          line_items: [
              {
                  price: plan,
                  quantity: 1
              },
          ],
          success_url: "http://localhost:5173/success",
          cancel_url: "http://localhost:5173/cancel"
      });
      return session;
  }catch (e){
      return e;
  }
};


const createnewSubscription =async(req,res)=>{
  const {plan,userId}=req.body
  let planId=null
  try {
    if(plan == 99) planId = basic;
    else if(plan == 499) planId = pro;
    else if(plan == 999) planId = business;
  const user= await findById

  } catch (error) {
    console.log(error)
    res.json({message:error})
  }
}











const createSubscription = async(req,res) => {
  try {

      const subscription = await stripe.subscriptions.create({
          customer: 'cus_Na6dX7aXxi11N4',
          items: [
              {
                  price: 'price_1MowQULkdIwHu7ixraBm864M',
              },
          ],
      });
      res.status(201).json({message:"Subscription Created Successfully",subscription})
  } catch (error) {
      console.error(error);
      res.status(501).json({message:"Subscription Failedy",error})

  }
}


const updateSubscription=async(req,res)=>{
    try {
        const subscription = await stripe.subscriptions.update(
          'sub_1MowQVLkdIwHu7ixeRlqHVzs',
          {
            metadata: {
              order_id: '6735',
            },
          }
        )   
    } catch (error) {
     console.log("")
    }
}

const Listing=async(req,res)=>{
    try {
        const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
        const subscriptions = await stripe.subscriptions.list({
          limit: 3,
        });    
    } catch (error) {
        
    }
}


const searchSubscription=async()=>{
try {
    const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
    const subscriptions = await stripe.subscriptions.search({
      query: 'status:\'active\' AND metadata[\'order_id\']:\'6735\'',
    }); 
} catch (error) {
    
}
}

const deletePayment=async()=>{
    try {
       
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const subscription = await stripe.subscriptions.cancel(
  'sub_1MlPf9LkdIwHu7ixB6VIYRyX'
); 
    } catch (error) {
        
    }
}







module.exports={createSubscription,updateSubscription,searchSubscription,deletePayment}