let model_name = "todos";
const asyncHandler = require("express-async-handler");
// make sure user schema exist in models dir
module.exports = function(restex) {
  let ToDo = restex.dao(model_name);
  const create = async (req, res, next) => {
    let todo = await ToDo.add(req.body);
    res.json(todo);
  };
  
  const destroy = async (req, res, next) => {
    let todo = await ToDo.destory({_id:req.params.id});
    res.json(todo);
  };
  return {
    create: asyncHandler(create),
    destroy: asyncHandler(destroy)
  };
};
