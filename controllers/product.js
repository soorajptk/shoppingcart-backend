const {makeDb}=require('../library/db.js')

const getAllProduct=async(req,res)=>{
let qry=`SELECT * FROM product join category on category.category_id=product.category_id`
try {
    const response=await makeDb().query(qry)
    res.status(200).json(response)
} catch (error) {
    console.log("something wrong");
}
}
const cart=async(req,res)=>{
    let qry=`SELECT * FROM cart JOIN customer ON cart.user_id=customer.id JOIN cart_items ON cart.cart_id=cart_items.cart_id JOIN product ON product.product_id=cart_items.product_id WHERE customer.id=${req.user.userId}`
    try {
        const response=await makeDb().query(qry)
        res.status(200).json(response)
    } catch (error) {
        res.status(200).json(error)
    }
    }


        const addToCart=async(req,res)=>{
            const {product_id}=req.body
            try {
            let qry=`SELECT * FROM cart WHERE user_id=${req.user.userId}`
            const response=await makeDb().query(qry)
            if(!response.length>0){
                let cartuser=`INSERT INTO cart SET?`
                const cartuserCreated=await makeDb().query(cartuser,{user_id:req.user.userId})
                let cartItemqry=`INSERT INTO cart_items SET?`
                const cartItemCreated=await makeDb().query(cartItemqry,{product_id,cart_id:cartuserCreated.insertId})
               return res.status(200).json("successfully item added to the cart")
            }else{
                let qryCheckItem=`SELECT * FROM cart_items WHERE cart_id=${response[0].cart_id} AND product_id=${product_id} `
                const cart_itemsCheck=await makeDb().query(qryCheckItem)
                if(cart_itemsCheck.length>0){
                
                    let cartItemqry=`UPDATE cart_items SET? WHERE cart_id=${response[0].cart_id} AND product_id=${product_id}`
                    let prevQty=`SELECT qty FROM cart_items WHERE product_id=${product_id}`
                    const prev=await makeDb().query(prevQty)
                    const cartItemCreated=await makeDb().query(cartItemqry,{qty:prev[0].qty+1})
                    console.log(cartItemCreated);
                    return res.status(200).json("successfully item added to the cart")
            }else{
                let cartItemqry=`INSERT INTO cart_items SET?`
                const cartItemCreated=await makeDb().query(cartItemqry,{product_id,cart_id:response[0].cart_id})
                return res.status(200).json("successfully item added to the cart")
                
                
                }
            }
        } catch (error) {
            console.log(error);
        }
        }
    
module.exports={
    getAllProduct,cart,addToCart
}