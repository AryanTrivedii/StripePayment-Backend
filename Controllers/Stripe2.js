const stripe = require('stripe')("sk_test_51Ofg1NSD713Gba2a8ljDNgELuDUNNKkG5N5ausUqfjIxYXxnG4iC2Tt73qOKdl01riAVu1LwQTFIqbE1g5ES9iNh00Nh11x0IH");
const [basic, premium, business] = ['price_1OfgZFSD713Gba2ac7phjrww', 'price_1Ofge7SD713Gba2ai5nA8rjs', 'price_1OfghJSD713Gba2a1SIF6pPP'];
const { MongoClient } = require('mongodb');
const User = require("../Models/Users"); 
const { response } = require('express');




const Third = async (req,res) => {
const { name, email, paymentMethod, priceId } = req.body;

    try {
        // create a stripe customer
        const customer = await stripe.customers.create({
            name: name,
            email: email,
            payment_method: paymentMethod,
            invoice_settings: {
                default_payment_method: paymentMethod,
            },
        });

        // create a stripe subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            payment_settings: {
                payment_method_options: {
                    card: {
                        request_three_d_secure: 'any',
                    },
                },
                payment_method_types: ['card'],
                save_default_payment_method: 'on_subscription',
            },
            expand: ['latest_invoice.payment_intent'],
        });
         
        // return the client secret and subscription id
        return res.json({
            clientSecret: subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
        });
    } catch (error) {
        console.error('Error creating subscription:', error.message);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
};



// UPDATE SUBSCRIPTION 

const updateSubscription=async(req,res)=>{

    try {
        const { priceId } = req.body; 
        const subscriptionId = req.params.subscriptionId;

       
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  
        const subscriptionItemId = subscription.items.data[0].id;

        const updatedSubscription = await stripe.subscriptionItems.update(
            subscriptionItemId,
            {
                price: priceId,
            }
        );

        return res.json(updatedSubscription);    
    } catch (error) {
      console.log(error)      
      res.json({message:{error}})
    }
}



const retrieveSubscription =async(req,res)=>{
    try {
        const subscriptionId = req.params.subscriptionId;

        // Retrieve the subscription
        const retrievedSubscription = await stripe.subscriptions.retrieve(subscriptionId);

        return res.json(retrievedSubscription);    
    } catch (error) {
      console.log(error)  
      res.json({message:error})
    }
}


const listSubscription =async(req,res)=>{
    try {
      const subscriptions = await stripe.subscriptions.list({
        limit:3
      })  
      res.status(200).json({message:"Subscription  Cancelled Successfully"})
    } catch (error) {
       console.log(error) 
       res.json({message:error})
    }
}

const cancelSubscription =async(req,res)=>{
    try {
        const subscriptionId = req.params.subscriptionId;
        const canceledSubscription = await stripe.subscriptions.cancel(subscriptionId);
        return res.json("Subscription Deleted Successfully",cancelSubscription);
    } catch (error) {
      console.log(error)  
      res.json({message:error})
    }
}


const stripeSession = async (plan) => {
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
        console.log(session)
        return session;
    } catch (e) {
        return e;
    }
};


// const createNewSubscription =async(req,res) => {
//  const  {plan, userId} = req.body 
// console.log(plan,userId)
//     try {
//         let planId = null;
//         if (plan == 99) planId = basic;
//         else if (plan == 499) planId = premium;
//         else if (plan == 999) planId = business;

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const session = await stripeSession(planId);

//         await User.updateOne(
//             { _id: userId },
//             {
//                 $set: {
//                     subscription: {
//                         sessionId: session.id,
//                         planId: planId,
//                         status: 'pending'
//                     }
//                 }
//             }
//         );

//         return res.json({ session });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         // Close the MongoDB connection when done
//         await client.close();
//     }
// };

module.exports = {Third,updateSubscription, retrieveSubscription,listSubscription,cancelSubscription,stripeSession} ;
