let memberController = module.exports;
const Member = require("../models/Member");



memberController.signup = async (req, res) => {
  try{
  console.log("POST:cont/signup");
  const data = req.body; //requestni badiy qismidan malumot olamiz.
  //console.log(`body:::`,req.body);
  const member = new Member();
  //const new_member = await member.signupData(data);
  new_member = await member.signupData(data);
console.log("i am here1991");
res.json({state: "succeed", data:new_member});
//res.send("done");
  } catch(err) {
  console.log(`ERROR, cont/signup, ${err.message}`);
  res.json({state: 'fail',message: err.message});
  };
}


// memberController.login = (req, res) => {
//   console.log("POST cont.login");
//   res.send("login sahifadasiz");
// };

memberController.login = async(req, res) => {
  try{
    console.log("POST:cont/login");
    const data = req.body, //requestni badiy qismidan malumot olamiz.
    //console.log(`body:::`,req.body);
    member = new Member(),
    result= await member.loginData(data);
    //console.log(1991);
    res.json({state: 'succeed', data:result});
    //res.send("done");
    } catch(err) {
    console.log(`ERROR, cont/login, ${err.message}`);
    res.json({state: 'fail',message: err.message});
    }
  }

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout sahifadasiz");
}
