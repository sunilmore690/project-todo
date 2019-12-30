const jwt = require("jsonwebtoken");
module.exports = restex => {
  let UserDao = restex.dao("users");
  const auth = (req, res, next) => {
    var token = req.headers["x-access-token"];
    console.log("verifytoken", token);
    if (!token)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });

    // verifies secret and checks exp
    jwt.verify(token, process.env.secret, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      // if everything is good, save to request for use in other routes
      req.user = decoded;
      // if (req.path === "/projects") req.query.user = req.user.id;
      next();
    });
  };
  const authorize = async (req, res, next) => {
    console.log("pathname", req.user);
    const user = await UserDao.get({_id:req.user.id});
    if(user.role == 'admin') return next()
    next({message:"You don't have permission to perform this operation"})
  };
  return { auth, authorize };
};
