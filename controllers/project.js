let model_name = "projects";
var jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
// make sure user schema exist in models dir
module.exports = function(restex) {
  let Project = restex.dao(model_name);
  //   let UserModel = restex.model(model_name);
  const create = async (req, res, next) => {
    let project = await Project.add(req.body);
    res.json(project);
  };
  const update = async (req, res, next) => {
    delete req.body.users;
    let project = await Project.update({ _id: req.parmas.id }, {});
    res.json(project);
  };
  const destroy = async (req, res, next) => {
    let project = await Project.add(req.body);
    res.json(project);
  };
  return {
    create: asyncHandler(create),
    destroy: asyncHandler(destroy),
    update: asyncHandler(update)
    
  };
};
