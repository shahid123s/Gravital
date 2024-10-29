const {decodeAccessToken} = require('../Config/jwt');


const authenticateUser = async (req, res, next) => {
    const authHead = req.headers['authorization'];
    const token = authHead && authHead.split(' ')[1];

    if(!token){
        return res.status(401)
        .json({message: 'AccessToken Required'});
    }
    try {
        const decode = await decodeAccessToken(token);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json( {message: 'Invalid or Expired Token'} )
    }
}

module.exports= {
    authenticateUser,
}