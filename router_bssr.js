const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require("./utils/upload-multer")("products");
const uploader_member = require("./utils/upload-multer")("member");


/**************************
*         BSSR EJS 
 ***************************/

// memberga dahldor routerlar
router_bssr.get("/", restaurantController.home);
router_bssr.get("/sign-up", restaurantController.getSignupMyRestaurant);
router_bssr.post("/sign-up",uploader_member.single("restaurant_img"),restaurantController.signupProcess);//signup router


router_bssr.get("/login", restaurantController.getLoginMyRestaurant);
router_bssr.post("/login", restaurantController.loginProcess);


router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

router_bssr.get("/products/menu", restaurantController.getMyRestaurantProducts);
router_bssr
  .post("/products/create",
  restaurantController.validateAuthRestaurant,
  uploader_product.array("product_images", 5),
  productController.addNewProduct);

router_bssr.post("products/edit/:id",productController.updateChosenProduct);





module.exports = router_bssr;