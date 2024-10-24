const User = require('../Model/userModel');
const {hashPassword, comparePassword} = require ('../Config/bcrypt');
const jwt = require('jsonwebtoken');



const register = async (req, res) => { 
     const  {username, email, password} = req.body;
     try {
        console.log(username, email, password)
     } catch (error) {
        console.log(`${error.message} happens in register the user`);
        res
        .status(500)
        .json({message : error.message});
     }
}





module.exports ={
    register,
}