const express = require('express');
const modelUser = require('../models/user');



/* CRUD*/

/*Crear un usuario */
const createUser = async (req, res)=>{
    try{
        const {firstname,lastname,country,department,municipality,document_type,document,active,avatar,email,password,rol} = req.body;
        // console.log(req.body);
        const newUser = new modelUser({firstname,lastname,country,department,municipality,document_type,document,active,avatar,email,password,rol});
        // console.log(newPost);
        const savedUser = await newUser.save();
        // res.status(201).json({message: "Post created"});
        res.status(201).json(savedUser);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

/*Listar todos los usuarios */
const getUsers = async (req, res)=>{
    try{
        const users = await modelUser.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

/*Obtener un usuario en especifico */
const getUser = async (req, res) => {
  const id = req.params.id;

  try {
      const user = await modelUser.findById(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}
/*Obtener un usuario en especifico por el email */
const getUserByEmail = async (req, res) => {
  const email = req.params.email;
 
  try {
     const user = await modelUser.findOne({ email: email });
     if (!user) {
         return res.status(404).json({ message: 'User not found' });
     }
     res.status(200).json(user);
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
 }
 
/*Actualizar un usuario */
const updateUser = async (req,res)=>{
  const { id } = req.params;
  const { firstname,lastname,country,department,municipality,document_type,document,active,avatar,email,password,rol } = req.body;
  try {
    const user = await modelUser.findByIdAndUpdate(id, { firstname,lastname,country,department,municipality,document_type,document,active,avatar,email,password,rol }, { new: true });
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}

/*Eliminar un usuario en especifico */
const removeUser = async(req, res)=>{
  try{
      const {id} = req.params;
      const userDelete = await modelUser.findByIdAndDelete(id)
      if(userDelete === null) {
          return res.status(404).json({message: "User not found"});
      }
      res.status(204).json();
  }catch(error){
      res.status(400).json({message: error.message});
  }
}


module.exports = {
  createUser,
  getUsers,
  updateUser,
  removeUser,
  getUser,
  getUserByEmail
}
