const express = require('express');
const modelProduct = require('../models/product')

/* CRUD*/

/*Crear un producto */
const createProduct = async (req, res)=>{
    try{
        const {name,description,state,avatar,date} = req.body;
        // console.log(req.body);
        const newProduct = new modelProduct({name,description,state,avatar,date});
        // console.log(newPost);
        const savedProduct = await newProduct.save();
        // res.status(201).json({message: "Post created"});
        res.status(201).json(savedProduct);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

/*Listar todos los products */
const getProducts = async (req, res)=>{
    try{
        const products = await modelProduct.find();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

/* Listar todos los productos que tengan un cierto estado*/
const getProductsByState = async (req, res) => {
    try {
        // Obtén el estado de los parámetros de la URL
        const { state } = req.params;

        // Verifica si se proporciona un estado en los parámetros de la URL
        if (!state) {
            return res.status(400).json({ message: 'Por favor, proporciona un estado válido en los parámetros de la URL.' });
        }

        // Busca los productos que coincidan con el estado
        const products = await modelProduct.find({ state });

        // Verifica si se encontraron productos
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos para el estado proporcionado.' });
        }

        // Devuelve los productos encontrados
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*Obtener un producto en especifico */
const getProduct = async (req, res) => {
    const id = req.params.id;
  
    try {
        const product = await modelProduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/*Actualizar un producto */
const updateProduct = async (req,res)=>{
    try {
      const { id } = req.params;
      const { name,description,state,avatar,date } = req.body;
      const product = await modelProduct.findByIdAndUpdate(id, { name,description,state,avatar,date }, { new: true });
      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
}

/*Eliminar un producto en especifico */
const removeProduct = async(req, res)=>{
    try{
        const {id} = req.params;
        const productDelete = await modelProduct.findByIdAndDelete(id)
        if(productDelete === null) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(204).json();
    }catch(error){
        res.status(400).json({message: error.message});
    }
 }
 

  module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    removeProduct,
    getProductsByState
  }