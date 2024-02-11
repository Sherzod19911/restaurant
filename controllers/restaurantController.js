const Member = require("../models/Member");
const Product = require("../models/Product");
const Definer = require("../lib/mistake");
const assert = require("assert");



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
      // res.json({state: 'fail',message: err.message});  
      res.redirect("/resto"); 
  }
}

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
      console.log("GET:cont/getSignupMyRestaurant");
      res.render("signup");
  } catch (err) {
      console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
      res.json({state: 'fail', message: err.message});   
  }
}


restaurantController.signupProcess = async (req, res) => {
try{
console.log("POST:cont/signupProcess");

console.log("req.file:::",req.file);
assert.ok(req.file, Definer.general_err3);
console.log("req.file:::",req.file);    


    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;

    const member = new Member();
    const result = await member.signupData(new_member);
    assert.ok(result, Definer.general_err1);
req.session.member = result;
 res.redirect("/resto/products/menu");


//console.log("new member:",new_member );
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
        res.render("login-page");
    } catch (err) {
        console.log(`ERROR, cont/getSignupMyRestaurant, ${err.message}`);
        res.json({ state: 'fail', message: err.message });  
    }
}




restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST:cont/loginProcess");
    const data = req.body; 
    console.log("req.body::",req.body);
    // Get data from the request body
    const member = new Member();
    const result = await member.loginData(data); // Call loginData method
    console.log("result::", result);
    req.session.member = result;
    req.session.save(function () {
      // Redirect based on the member type
      result.mb_type === "Admin"
        ? res.redirect("/resto/all-products")
        : res.redirect("/resto/products/menu");
    });
    // Send JSON response with successful state and data
    res.json({ state: 'succeed', data: result });
  } catch (err) {
    // Log error and send JSON response with fail state and error message
    console.log(`ERROR, cont/loginProcess, ${err.message}`);
    res.json({ state: 'fail', message: err.message });
  }
};





// restaurantController.loginProcess = async(req, res) => {
//   try{
//     console.log("POST:cont/loginProcess");
//     const data = req.body, //requestni badiy qismidan malumot olamiz.
//     member = new Member(),
//     result= await member.loginData(data);
//     req.session.member = result;
//     req.session.save(function () {
//       result.mb_type ==="Admin"
//       ?  res.redirect("/resto/all-products")
//       :  res.redirect("/resto/products/menu");

//     });
//     // console.log(1991);
//     // console.log(`body:::`,req.body);

//     // console.log("result:", result);
//     res.json({state: 'succeed', data:result});
//     //res.send("done");
//     } catch(err) {
//     console.log(`ERROR, cont/loginProcess, ${err.message}`);
//     res.json({state: 'fail',message: err.message});
//     }
// };

 restaurantController.logout = (req, res) => {
  try{
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch(err) {
    console.log(`ERROR, cont/logout, ${err.message}`);
    res.json({ state: "fail", message: err.message});
  }
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