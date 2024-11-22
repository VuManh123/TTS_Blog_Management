require("express-router-group");
const express = require("express");
const middlewares = require("kernels/middlewares");
const { validate } = require("kernels/validations");
const exampleController = require("modules/examples/controllers/exampleController");
const router = express.Router({ mergeParams: true });

// ===== EXAMPLE Request, make this commented =====
// router.group("/posts",middlewares([authenticated, role("owner")]),(router) => {
//   router.post("/create",validate([createPostRequest]),postsController.create);
//   router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//   router.delete("/delete/:postId", postsController.destroy);
// }
// );

const categoryController = require("modules/category/controllers/categoryController");
const categoryValidation = require("modules/category/validations/categoryValidation"); 
const languageController = require("modules/language/controllers/languageController");
const userController = require("modules/user/controllers/userController");
const blogValidation = require("modules/blog/validations/blogValidation");

const blogController = require("modules/blog/controllers/blogController");

router.get("/categories", categoryController.getAll);
router.get("/categories/:id", categoryController.getById);
router.post("/categories", validate(categoryValidation.create), categoryController.create);
router.put("/categories/:id", validate(categoryValidation.update), categoryController.update);
router.delete("/categories/:id", categoryController.delete);

router.post("/languages", validate([]), languageController.create);
router.get("/languages", languageController.getAll);
router.get("/languages/:id", languageController.getById);
router.put("/languages/:id", validate([]), languageController.update);
router.delete("/languages/:id", languageController.delete);

router.post("/blogs", validate(blogValidation.create), blogController.create);
router.get("/blogs", blogController.getAll);
router.get("/blogs/:id", blogController.getById);
router.put("/blogs/:id", validate(blogValidation.update), blogController.update);
router.delete("/blogs/:id", blogController.delete);

router.post("/users", userController.create);
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.put("/users/:id", validate([]), userController.update);
router.delete("/users/:id", userController.delete);



module.exports = router;

router.group("/example", validate([]), (router) => {
  router.get('/', exampleController.exampleRequest)
})

module.exports = router;
