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


const usersList = async(req, res) => {
   try {

    const {search} = req.query;
    console.log(search, req.query)
    const searchData = search.trim().replace(/[^a-zA-Z\s]/g, "");

    console.log(searchData)
    const userList = await User.find({
        $and: [
            { fullName: { $regex: new RegExp(`^${searchData}`, "i") } },
            { role: 'user' }
        ]
    } ,'username email fullName phoneNumber isBan isBlock' );
    console.log(userList)
    res.json(userList)
   } catch (error) {
    console.log(error);
    res
    .status(504)
    .json({message : error.message})
   }
}


const banUser = async (req, res) => {
    console.log('ivda bannaa ');
    

    const {userId} = req.body;

    
    await User.findByIdAndUpdate(userId, {$set:{isBan : true}})

    console.log(userId);
    res.json({message  : 'okay'})
}


const unBanUser = async (req, res) => {
    const { userId} = req.body;
    await User.findByIdAndUpdate( userId, {$set : {isBan: false}});
    res.json({message: 'Okay aan monu '})
}


const userData = async(req, res) => { 
    const { userId } = req.query;
    console.log('enthaanu');
    
    const response = await User.findById(userId).select('-password -refreshToken');
    console.log(response, 'entha');
    
    res.json(response)
}

const blockUser = async (req, res) => {
    const {userId} = req.body;
    console.log(userId, req.body)
    await User.findByIdAndUpdate(userId, {$set: {isBlock: true}});
    res.json({message: 'User Blocked Successfully'});
}

const unBlockUser = async (req, res) => {
    const {userId} = req.body;
    console.log(req.body);
    await User.findByIdAndUpdate(userId, {$set: {isBlock: false}});
    res.json({message: 'User Unblocked Successfully'});


}

module.exports = {
    adminLogin,
    usersList,
    banUser,
    unBanUser,
    userData,
    blockUser,
    unBlockUser
}