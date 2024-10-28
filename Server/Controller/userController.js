const User = require('../Model/userModel');
const { hashPassword, comparePassword } = require('../Config/bcrypt');
const { getData, storeData, storeOtp, getOtp } = require('../Config/redis')
const jwt = require('jsonwebtoken');
const genrateOtp = require('../Config/generateOtp')
const sendOtpToEmail = require('../Config/sendOTPEmail')
const { v4: uuidv4 } = require('uuid');
const { generateAccessToken, generateRefreshToken, decodeRefreshToken } = require('../Config/jwt');




const sendotp = async (req, res) => {
  const { username, email, password, } = req.body;
  try {
    if (username && email && password) {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(409)
          .json({ message: 'Email is already Exists' });
      };

      user = await User.findOne({ username });

      if (user) {
        return res
          .status(409)
          .json({ message: 'Username is already Exists' })
      }

      const hasedPassword = await hashPassword(password);

      user = {
        userID: uuidv4(),
        username,
        email,
        password: hasedPassword,
      }
      storeData(email, user, 1000);
    }
    const otp = genrateOtp(7);
    storeOtp(email, JSON.stringify(otp));
    sendOtpToEmail(email, otp);

    res
      .status(200)
      .json({ message: 'OTP send Successfully' })



  } catch (error) {
    if (error.code === 11000) {
      console.error(error.message);
      return res.status(409).json({ message: 'Username is already taken' })
    }
    console.error(`${error.message} happens in register the user`);
    res
      .status(500)
      .json({ message: error.message });
  }
}


const otpVerification = async (req, res) => {
  try {
    const { otp, email } = req.body;
  const currentOtp = await getOtp(email)
  if(!currentOtp){
    return res.status(404).json({message : 'OTP Expired'})
  }
  if (+otp === Number(currentOtp)) {
    res.status(200).json({ message: "OTP Verified Successfully" })
  }
  } catch (error) {
    res.status(504).json({message: error.message})
  }
}


const register = async (req, res) => {
  const {fullName, phoneNumber, email} = req.body
  try {
    console.log()
    const userData = await getData(email);
    console.log(userData)
    const userDetails = {...userData, fullName , phoneNumber};

    const user = new User({...userDetails});
    await user.save();

    res
    .status(200)
    .json({message : 'User Registred Successfully'})
    
    
  } catch (error) {
    console.log(error.message);
    res.status(504).json({message: error.message})
  }
}

const login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res
      .status(404)
      .json({message : 'Invalid Email or Password'});
    }
    const isMatchPassword = await comparePassword(password, user.password);

    if(!isMatchPassword){
      return res
      .status(404)
      .json({message : 'Invalid Email or Password'})
    }

    const accessToken = await generateAccessToken(user._id, user.role);
    const refreshToken = await generateRefreshToken(user._id, user.role);
    
    user.refreshToken = refreshToken;
    await user.save();
    console.log(user.refreshToken)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV ==='production',
      sameSite : 'Strict',
      maxAge : 7 * 24 * 60 * 60 * 1000,
    })


    res
    .status(200)
    .json({message : 'Login Successfully', accessToken});

  } catch (error) {
    console.log(error)
    res.status(504).json({message : error.message});
  }
}


const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if(!refreshToken) {
    return res
    .status(401)
    .json({message: 'Token Required'});
  }
  try {
    const decode = decodeRefreshToken(refreshToken);
    const user = await User.findById(decode.userId);
    
    if(!user || user.refreshToken !== refreshToken){
      return res.status(403).json({message :'Invalid Token'});
    }

    //
    const accessToken = generateAccessToken(user._id);


    res.json({accessToken});

  } catch (error) {
    res.status(403).json({message: 'Token Expired or Invalid'});
  }
}

module.exports = {
  sendotp,
  otpVerification,
  register,
  login,
  refreshAccessToken,
}