const express = require("express");
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");


/**************************
*         BSSR EJS 
 ***************************/

// memberga dahldor routerlar
//router.get("/", memberController.home);
router_bssr.get("/signup", restaurantController.getSignupMyRestaurant);
router_bssr.post("/signup", restaurantController.signupProcess);

router_bssr.get("/login", restaurantController.getLoginMyRestaurant);
router_bssr.post("/login", restaurantController.loginProcess);


router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

router_bssr.get("/products/menu", restaurantController.getMyRestaurantData);




module.exports = router_bssr;