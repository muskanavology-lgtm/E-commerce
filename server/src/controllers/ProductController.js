const Product = require('../models/productModel');
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });                                                              
    }
};
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (product) {
            res.status(200).json(product);
        } else {
        res.status(404).json({ message: "Product Not updated!!!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({ message: "Product deleted" });
        } else {
            res.status(404).json({ message: "Product not deleted" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
