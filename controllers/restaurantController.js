const Member = require("../models/Member");
const Product = require("../models/Product");


let restaurantController = module.exports;

restaurantController.home = (req, res) => {
    try{
      console.log("GET: cont/home");
      res.render("home-page");
    } catch (err) {
      console.log(`ERROR, cont/home, ${err.message}`);
      res.json({state: "fail", message: err.message});
    }
  };

restaurantController.getMyRestaurantProducts = async (req, res) =>{
    try {
        console.log("GET: cont/getMyRestaurantProducts");
        const product = new Product();
        const data = await product.getAllProductsDataResto(res.locals.member);
        res.render("restaurant-menu", {restaurant_data: data});
      } catch (err) {
        console.log(`ERROR, cont/getMyRestaurantProducts, ${err.message}`);
      res.json({state: 'fail',message: err.message});   
  }
}

restaurantController.getSignupMyRestaurant = async (res, req) => {
    try {
        console.log("GET:cont/getSignupMyRestaurant");
        res.render('signup');
    }catch (err) {
        console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
        res.json({state: 'fail',message: err.message});   
    }
}

restaurantController.signupProcess = async (req, res) => {
try{
console.log("POST:cont/signup");
const data = req.body, //requestni body qismidan malumot olamiz.

member = new Member(),



 new_member =  await member.signupData(data);
 req.session.member = new_member;
 res.redirect("/resto/products/menu");


console.log("new member:",new_member );
//res.json({state: "succeed", data:new_member});
//res.send("done");
} catch(err) {
console.log(`ERROR, cont/signup, ${err.message}`);
res.json({state: 'fail',message: err.message});
}
};
// restaurantController.getLoginMyRestaurant = async (res, req) => {
//     try {
//         console.log("GET:cont/getLoginMyRestaurant");
//         res.render('login-page');
//     }catch (err) {
//         console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
//         res.json({state: 'fail',message: err.message});  
//     }
// }
restaurantController.getLoginMyRestaurant = async (req, res) => {
    try {
        console.log("GET:cont/getLoginMyRestaurant");
        res.render('restaurant-menu.ejs');
    } catch (err) {
        console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
        res.json({ state: 'fail', message: err.message });  
    }
}




restaurantController.loginProcess = async(req, res) => {
  try{
    console.log("POST:cont/login");
    const data = req.body, //requestni badiy qismidan malumot olamiz.
    member = new Member(),
    result= await member.loginData(data);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");

    });
    console.log(1991);
    console.log(`body:::`,req.body);

    console.log("result:", result);
    res.json({state: 'succeed', data:result});
    //res.send("done");
    } catch(err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({state: 'fail',message: err.message});
    }
};
console.log("shrzod");
 restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
};


restaurantController.validateAuthRestaurant = (req, res, next) => {
    if (req.session?.member?.mb_type === "RESTAURANT") {
      req.member = req.session.member;
      next();
    } else
     res.json({
      state: "fail",
       Error: "only authenticated memebers with restaurant type"
      });
  };
restaurantController.checkSessions = (req,res) => {
    if (req.session?.member) {
      res.json({state: "succeed", data: req.session.member});
    } else {
      res.json({state: "fail", message: "You are not authenticated"});
    } 
}