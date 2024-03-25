const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");
const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createFilterObj,
} = require("../services/productService");
const authService = require("../services/authService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getProducts)
  .post(
    authService.protect,
    authService.allowedTo("admin", "seller"),
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowedTo("admin", "seller"),
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
