let model_name = "users";
var jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler"); // make sure user schema exist in models dir
module.exports = function(restex) {
  let UserDao = restex.dao(model_name);
  let UserModel = restex.model(model_name);
  let authenticate = async (req, res, next) => {
    //Using Promise then & catch
    const user = await UserDao.get({email:req.body.email,password:req.body.password});
    if (!user) {
      throw new Error("Email or password is wrong");
    }
    var token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name
      },
      process.env.secret,
      {
        expiresIn: 86400 // expires in 24 hours
      }
    );
    res.json({ token ,user});
  };
  let getCount = async (req, res, next) => {
    const count = await UserModel.count();
    res.json({ count });
  };
  return {
    authenticate: asyncHandler(authenticate),
    getCount: asyncHandler(getCount)
  };
};
