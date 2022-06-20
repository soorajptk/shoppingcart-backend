const express=require('express')
const router=express.Router()
const {getAllProduct,cart,addToCart}=require('../controllers/product')
const auth=require('../middlewares/authentication')

router.route('/').get(auth,getAllProduct)
router.route('/cart').get(auth,cart)
router.route('/addcart').post(auth,addToCart)
module.exports=router