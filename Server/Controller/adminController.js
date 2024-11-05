const {comparePassword} = require('../Config/bcrypt');
const User = require('../Model/userModel');
const {generateAccessToken, generateRefreshToken, decodeRefreshToken} = require('../Config/jwt');


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
        secure: false,  
        sameSite: 'Lax',
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

    const {search, page, limit} = req.query;
    const skip = (page - 1) * limit;
    const searchData = search.trim().replace(/[^a-zA-Z\s]/g, "");

    const [userList,countList] = await Promise.all([
        User.find({
            $and: [
                { fullName: { $regex: new RegExp(`^${searchData}`, "i") } },
                { role: 'user' }
            ]
        } ,'username email fullName phoneNumber isBan isBlock' ).skip(skip).limit(limit),
        User.find({
            $and: [
                { fullName: { $regex: new RegExp(`^${searchData}`, "i") } },
                { role: 'user' }
            ]
        }  ).countDocuments(),
    ]);

    const totalPage = Math.ceil(countList / limit) ;
    console.log(countList, totalPage)

    console.log(userList)
    res.status(200).json({userList, totalPage, currentPage : page})
   } catch (error) {
    console.log(error);
    return res
    .status(504)
    .json({message : error.message})
   }
}


const banUser = async (req, res) => {
    console.log('ivda bannaa ');
    

    const {userId} = req.body;

    
    await User.findByIdAndUpdate(userId, {$set:{isBan : true}})

    console.log(userId);
    res.status(200).json({message  : 'User Banned Successfully'})
}


const unBanUser = async (req, res) => {
    const { userId} = req.body;
    await User.findByIdAndUpdate( userId, {$set : {isBan: false}});
    res.status(200).json({message: 'User Unbanned Successfully'})
}


const userData = async(req, res) => { 
    const { userId } = req.query;
    try {
        const response = await User.findById(userId).select('-password -refreshToken');
        res.status(200).json(response)
    } catch (error) {
        res.status(504).json({message: error.message})
    }
}

const blockUser = async (req, res) => {
    const {userId} = req.body;
   try {
    console.log(userId, req.body)
    await User.findByIdAndUpdate(userId, {$set: {isBlock: true}});
    res.status(200).json({message: 'User Blocked Successfully'});
   } catch (error) {
    res.status(504).json({message: error.message})
   }
}

const unBlockUser = async (req, res) => {
    const {userId} = req.body;
   try {
    await User.findByIdAndUpdate(userId, {$set: {isBlock: false}});
    res.status(200).json({message: 'User Unblocked Successfully'});
   } catch (error) {
    res.status(504).json({message: error.message})
   }


}

const refreshAccessToken = async (req, res) => {
    console.log('oaky anana mur', req.cookies)
    const {adminToken} = req.cookies;

    if(!adminToken) {
        return res
        .status(403)
        .json({message: 'Token Expired'});
    }
    
    try {
        const decode = await decodeRefreshToken(adminToken);
        const user = await User.findById(decode.userId);
    
        if(!user || user.refreshToken != adminToken) {
             return res.status(403).json({message: 'Invalid or Expire Token '});
        }
        const accessToken =  await generateAccessToken(user._id, user.role);
        res.status(200).json({accessToken})
        
    } catch (error) {       
        res.status(403).json({message: "Token expired or Invalid Token"});
    }

}


const adminLogout = async (req, res) => {
    res.clearCookie('adminToken');
    res.status(200).json({ message: 'User Logout Successfully' })
}

module.exports = {
    adminLogin,
    usersList,
    banUser,
    unBanUser,
    userData,
    blockUser,
    unBlockUser,
    refreshAccessToken,
    adminLogout,
}