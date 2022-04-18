const router = require("express").Router();
const productcontroller = require("../controllers/productcontroller");
const usercontroller = require("../controllers/usercontroller");
const authmiddleware = require("../middleware/authmiddleware");

router.post("/addProduct", productcontroller.addProduct);
router.post("/addUser", usercontroller.addUser);
router.post("/loginUser", usercontroller.loginUser);
router.post(
  "/deleteUser/:id",
  authmiddleware.verifytoken,
  usercontroller.deleteUser
);
router.put("/updateProduct/:id", productcontroller.updateProduct);
router.delete("/deleteProduct/:id/", productcontroller.deleteProduct);
router.post("/getProduct/:QR_hashcode", productcontroller.readQR);
router.post("/getallProducts/", productcontroller.readAllProducts);

module.exports = router;
