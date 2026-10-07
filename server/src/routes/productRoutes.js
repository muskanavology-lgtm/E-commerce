const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const { protect, admin } = require('../middleware/authMiddleware');
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword 
      ? { name: { $regex: req.query.keyword, $options: 'i' } }  : {};
    const category = req.query.category ? { category: req.query.category } : {};
    const products = await Product.find({ ...keyword, ...category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/', protect, admin, async (req, res) => {
  const { name, price, description, category, stock, image } = req.body;

  const product = new Product({
    name, price, description, category, stock, image
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
module.exports = router;
const express=require('express');
const router=express.Router();
const Product=require('../models/productModel');
const {protect,admin}=require('../middleware/authMiddleware');
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.query.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(products);
  }catch(error){
    res.status(500).json({message:error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const{name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
  });
  router.get('/:id',async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
      res.json(product);
    }else{
      res.status(404).json({message:"Product not found"});
    }
  });
const express=require('express');
const router=express.Router();
const Product=require('../models/productModel');
const {protect,admin}=require('../middleware/authMiddleware');
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.query.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(Products);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product=await Product.findById(req.params.id);
  if(product){
    res.json(product);
  }
  else{
    res.status(404).json({message:"Product not found"});
  }
});
const express=require('express');
const router=express.Router();
const Product=require('../models/productModel');
const {protect,admin}=require('../middleware/authMiddleware');
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.query.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(Products);
  }catch(error){
    res.status(500).json({message:error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product =await Product.findById(req.params.id);
  if(product){
res.json(product);
  }
  else{
    res.status(404).json({message:"Product not found"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:Req.keyworod,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(Products);
  }catch(error){
    res.status(500).json({message:error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product=await Product.findbyid(req.params.id);
  if(product){
    res.json(product);
  }else{
    res.status(404).json({message:"PRoduct not found"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(Products);
  }catch(error){
    res.status(500).json({message:Error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product=await Product.findbyid(req.params.id);
  if(product){
    res.json(product);
  }else{
    res.status(404).json({message:"Product not found"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{Regex:req.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Produtc.find({...keyword,...category});
  res.json(Products);
  }
  catch(error){
    res.status(500).json({message:Error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product=await Product.findbyid(req.params.id);
  if(product){
    res.json(product);
  }else{
    res.status(404).json({message:"Product not found"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{Regex:req.keywird,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(Products);
  }catch(error){
    res.status(500).json({message:Error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product=await Product.findbyid(req.params.id);
  if(product){
    res.json(product);
  }else{
    res.status(404).json({message:"Product not found"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(Products);
  }catch(error){
    res.status(500).json({message:Error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    nameprice,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product=await Product.findbyid(req.params.id);
  if(product){res.json(product);
  }
  else{
    res.status(404).json({message:"Product not found"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(products);
  }catch(error){
    res.status(500).json({message:Error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const{name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  const product=await Product.findbyid(req.params.id);
  if(product)
  {res.json(product);}
  else{
    res.status(404).json({message:"Product not found"});
  }
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(products);
  }catch(error){
    res.status(500).json({message:Error.message});
  }
});
router.post('/',protect,admin,async(req,res)=>{
  const{name,price,description,category,stock,image}=req.body;
  const product=new Product({
    nmae,price,description,category,stock,image
  });
});
router.get('/:id',async(req,res)=>{
  try{
    const product=await Product.findbyid(req.params.id);
    if(product){
      res.json(product);
    }else{
      res.status(404).json({message:"PRoduct not found"});
    }
  }catch(error){res.status(500).json({message:error.message});}
});
router.post('/',protect,admin,async(req,res)=>{
  const {name,price,description,category,stock,image}=req.body;
  const product=new Product({
    name,price,description,category,stock,image
  });
});
router.get('/',async(req,res)=>{
  try{
    const keyword=req.query.keyword?{name:{regex:req.keyword,$option:'i'}}:{};
    const category=req.query.category?{category:req.query.category}:{};
    const products=await Product.find({...keyword,...category});
    res.json(products);
  }catch(error){
    res.status(500).json({message:Error.message});
  }
});
router.post('/',protect,admin)