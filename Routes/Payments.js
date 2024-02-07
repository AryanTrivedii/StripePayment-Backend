const express=require("express")
const router=express.Router()
const  {stripeSession,createNewSubscription,Third,updateSubscription, retrieveSubscription,listSubscription,cancelSubscription,Order, AllOrders}=require("../Controllers/SubscriptionsStripe")


router.get('/createsub', stripeSession)


router.post('/third',Third)

router.post('/upsub/:subscriptionId',updateSubscription)
 
router.get('/ret/:subscriptionId',retrieveSubscription)

router.get('/listsub',listSubscription)

router.delete("/cansub/:subscriptionId",cancelSubscription)


router.get('/orders/:userId',Order)

router.get('/all',AllOrders)




module.exports=router