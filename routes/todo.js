module.exports = function(router) {
  router.post("/todos", "todo#create", {
    middleware: ["auth", "authorize"]
  });
  router.delete("/todos/:id", "todo#destroy", {
    middleware: ["auth", "authorize"]
  });
 
 
};
