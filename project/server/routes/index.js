const express = require ('express');
const router = express.Router ();

// const auth = require("../middleware/auth.js");

//user
const {signup, login, deleteUser} = require ('../controllers/user.js');
router.post ('/user/signup', signup);
router.post ('/user/login', login);
router.delete ('/user/delete/:id', deleteUser);

//product
const {
  getAllProduct,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require ('../controllers/product.js');
router.get ('/product', getAllProduct);
router.get ('/product/:slug', getProductById);
router.delete ('/product/:id', deleteProduct);
router.post ('/product', createProduct);
router.put ('/product/:id', updateProduct);

//category
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require ('../controllers/category.js');
router.get ('/category', getAllCategory);
router.post ('/category', createCategory);
router.put ('/category/:id', updateCategory);
router.delete ('/category/:id', deleteCategory);

//volume
const {getAllVolume} = require ('../controllers/volume.js');

router.get ('/volume', getAllVolume);
//export
module.exports = router;
