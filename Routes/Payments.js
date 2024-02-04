const express=require("express")
const router=express.Router()
const  {stripeSession,createNewSubscription,Third,updateSubscription, retrieveSubscription,listSubscription,cancelSubscription}=require("../Controllers/Stripe2")


router.get('/createsub', stripeSession)

//router.post('/cr',createNewSubscription)

router.post('/third',Third)

router.post('/upsub/:subscriptionId',updateSubscription)
 
router.get('/ret/:subscriptionId',retrieveSubscription)

router.get('/listsub',listSubscription)

router.delete("/cansub/:subscriptionId",cancelSubscription)


module.exports=router