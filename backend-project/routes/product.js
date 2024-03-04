const express = require("express");
const router = express.Router();
const productController = require("../controllers/product")

/* http://localhost:3000/api/v1/products/new-product */
router.post("/new-product", productController.createProduct);

/* http://localhost:3000/api/v1/products */
router.get("/", productController.getProducts);

/* http://localhost:3000/api/v1/products/1 */
router.get("/:id", productController.getProduct);

/* http://localhost:3000/api/v1/products/1 */
router.delete("/:id", productController.removeProduct);

/* http://localhost:3000/api/v1/products/update-user/1 */
router.put("/update-product/:id", productController.updateProduct);

/* http://localhost:3000/api/v1/products/state/In_Stock */
router.get("/state/:state",productController.getProductsByState)

module.exports = router;