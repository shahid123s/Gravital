const {comparePassword} = require('../Config/bcrypt');
const User = require('../Model/userModel');
const {generateAccessToken, generateRefreshToken,} = require('../Config/jwt');


const adminLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({message: 'Invalid Email or Password'});
    }
    if(user.role !== 'admin'){
        return res.status(406).json({message: 'Invalid Email or Password'});
    }
    const isMatch = await comparePassword(password, user.password);
    
    if(!isMatch){
        return res.status(404).json({message: 'Invalid Email or Password'})
    };

    const accessToken = await generateAccessToken(user._id, user.role);
    const refreshToken = await generateRefreshToken(user._id, user.role);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('adminToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite : 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200)
    .json({message : 'Admin Login Successfully', accessToken});
    } catch (error) {
        console.log(error);
        res.status(504).json({message : error.message});
    }


}




module.exports = {
    adminLogin,
}