const router = require("express").Router();
const Product = require("./products/router");

router.use("/products", Product);

module.exports = router;
