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
const categoryValidation = require("modules/category/validations/categoryValidation"); // Nếu bạn có validations
const languageController = require("modules/language/controllers/languageController");

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

module.exports = router;


router.group("/example", validate([]), (router) => {
  router.get('/', exampleController.exampleRequest)
})

module.exports = router;
