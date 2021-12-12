require('dotenv').config()

const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    // const token = req.cookies.userInfo;
    const token = req.headers['x-access-token']
    if(token){
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');

            }else{
              req.user = user;
              next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

 const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

  const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

  module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  };