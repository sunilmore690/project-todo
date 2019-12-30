module.exports = function(router) {
  router.post("/projects", "project#create", {
    middleware: ["auth", "authorize"]
  });
  router.delete("/projects/:id", "project#destroy", {
    middleware: ["auth", "authorize"]
  });
  router.put("/projects/:id", "project#update", {
    middleware: ["auth", "authorize"]
  });
  router.get("/usercount", "user#getCount", { middleware: ["auth"] });
};
