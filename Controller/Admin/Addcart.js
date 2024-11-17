const customerCartModel = require('../../Model/Admin/Addcart');
class customerCart{
  
      async addToCartCustomer(req,res){
        try {
            let {userId, foodItemId, quantity, price,totalPrice }=req.body;
            let data=await customerCartModel.findOne({userId:userId,foodItemId:foodItemId});
            if(data) return res.status(400).json({error:"Fooditem already exits in cart"});
             await  customerCartModel.create({price,userId,foodItemId,quantity,totalPrice})
            return res.status(200).json({success:"Successfully added"})

        } catch (error) {
            console.log(error);
        }
    }
async getAllCartProductsByCustomer(req, res) {
    try {
        const customerId = req.params.id;
        const cartProducts = await customerCartModel.find({ userId: customerId }).sort({ _id: -1 });

        return res.status(200).json({
            msg: "Here is the list of products in your cart: ",
            success: true,
            cartProducts: cartProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Error retrieving cart products" });
    }
}

async DeleteAllCartProductsByCustomer(req,res){
  try {
    let {userId,foodItemId}=req.body;
      let data= await customerCartModel.deleteOne({userId:userId,foodItemId:foodItemId});
      // console.log(data,customerId,productId);
      return res.status(200).json({success:"Successfully deleted"})
  } catch (error) {
      console.log(error);
  }
}
async priceIncAnddec(req,res){
    try {
        let {cartId,quantity,totalPrice}=req.body
        let data= await customerCartModel.findOneAndUpdate({_id:cartId},{$set:{quantity,totalPrice}},{new:true});
        if(!data) return res.status(400).json({error:"Something went wrong!"});
        return res.status(200).json({success:"Success"})
    } catch (error) {
        console.log(error);
    }
}
async DeleteAllfoodCart(req, res){
    try{
        const customerId = req.params.id;
        const cartProducts = await customerCartModel.deleteMany({userId: customerId})
        return res.status(200).json({msg: "Successfully deleted"});
    }catch(error){
        console.log(error);
    }
}

}

const customerCartController = new customerCart();
module.exports = customerCartController;