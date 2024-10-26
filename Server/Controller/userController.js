const User = require('../Model/userModel');
const {hashPassword, comparePassword} = require ('../Config/bcrypt');
const jwt = require('jsonwebtoken');
const {v4 : uuidv4} = require('uuid')
const  { createClient } = require('redis');

//redis configuration 
const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});


const register = async (req, res) => { 
     const  {username, email, password, fullName} = req.body;
     try {
        let user = await User.findOne({email});

       if(user){
         return res
         .status(409)
         .json({message : 'Email is already Exists'});
       };

       user = await User.findOne({username});

       if(user){
         return res
         .status(409)
         .json({message: 'Username is already Exists'})
       }

       const hasedPassword = await hashPassword(password);
       
      
       
       res
       .status(200)
       .json({message: 'User registration done successfully'})


     } catch (error) {
      if(error.code === 11000){
         console.error(error.message);
         return res.status(409).json({message :'Username is already taken'})
      }
        console.error(`${error.message} happens in register the user`);
        res
        .status(500)
        .json({message : error.message});
     }
}





module.exports ={
    register,
}