const User = require('../Model/userModel');
const {hashPassword, comparePassword} = require ('../Config/bcrypt');
const {getData, storeData, storeOtp, getOtp} = require('../Config/redis')
const jwt = require('jsonwebtoken');
const genrateOtp = require('../Config/generateOtp')
const sendotp = require('../Config/sendOTP')
const {v4 : uuidv4} = require('uuid');



const register = async (req, res) => { 
     const  {username, email, password, } = req.body;
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
       
       user = {
        userID : uuidv4(),
        username,
        email,
        password: hasedPassword,
       }
       storeData(email, user, 600);
       const otp = genrateOtp(7);
       storeOtp (email,JSON.stringify(otp));
       sendotp(email, otp)
     
  
       res
       .status(200)
       .json({message: 'OTP send Successfully'})



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