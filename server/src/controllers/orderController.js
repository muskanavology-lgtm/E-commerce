const Order = require('../models/orderModel');
const addOrderItems = async (req, res) => {
    try {
        const { user, orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "not order yet!" });
        } else {
            const order = new Order({
                user,
                orderItems,
                shippingAddress,
                paymentMethod,
                totalPrice
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { addOrderItems, getOrderById };
const Order=require('../models/orderModel');
const addOrderItems=async(req,res)=>{
    try{
        const{user,orderItems,shippingAddress,totalPrice}=req.body;
        if(orderItems && orderItems.length===0){
            return res.status(400).json({message:"not order yet!!"});
        }
        else{
        const order=new Order({
            user,orderItems,shippingAddress,paymentMethod,totalPrice
        });
        const createdOrder=await order.save();
        res.status(201).json(createdOrder);
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findbyid(req.params.id).populate('user','name email');
        if(order){
            res.status(200).json(order);
        }else{
            res.status(404).json({message:"Order not found"});
        }
    }catch(error){res.status(500).json({message:error.message});
}
};
const Order=require('../models/orderModel');
const addOrderItems=async(req,res)=>{
    try{
        const {user,orderItems,shippingAddress,totalPrice}=req.body;
        if(orderItems && orderItems.length===0){
            return res.status(400).json({message:"Not order yet!!"});
        }else{
            const order=new Order({
                user,orderItems,shippingAddress,paymentMethod,totalPrice
            });
            const createdOrder=await order.save();
            res.status(201).json(createdOrder);
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findbyid(req.params.id).populate('user','name email');
        if(order){
            res.status(200).json(order);
        }
        else{
            res.status(404).json({message:"Order not found"});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const Order=require('./models/orderModel');
const addOrderItems=async(req,res)=>{
    try
    {
        const {user,orderItems,shippingAddress,totalPrice}=req.body;
        if(orderItems && orderItems.length===0){
            return res.status(400).json({message:"Nor order yet!!"});
        }
        else{
            const order=new Order({
                user,orderItems,shippingAddress,paymentMethod,totslPrice
            });
            const createdOrder=await order.save();
            res.status(201).json(createdOrder);
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findbyid(req.params.id).populate('user','name email');
        if(order){
            res.status(404).json({message:"ORder not found"});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

