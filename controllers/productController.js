let productController = module.exports;

const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

productController.getAllProducts = async(req,res) => {
    try {
        console.log('GET: cont/getAllProducts');

    }catch(err) {
        console.log(`ERROR, cont/getAllProducts, ${err.message}`);
    res.json({state: 'fail', message: err.message})
    }
};



productController.addNewProduct = async(req,res) => {
    try {
        console.log("POST: cont/addNewProduct");
        console.log(req.member);
       // res.send('ok');
        //TODO:product creation develop
        assert.ok(req.files, Definer.general_err3);
    const product = new Product();
    let data = req.body;

    data.prodact_images = req.files.map((ele) =>{
      return ele.path; //Get file path and save it to DB
    });
    const result = await product.addNewProductData(data, req.member);
    assert.ok(result, Definer.product_err1);
    const html = `<script>
                    alert(new dish added successfully);
                    window.location.replace("/resto/products/menu");
                  <script>`; //if product added successfully it send a product sucessfuly
    res.end(html);

        }catch(err) {
        console.log(`ERROR, cont/addNewProduct, ${err.message}`);
         res.json({state: 'fail', message: err.message}) //nima uchun res json bn qaytarish q\xato  degansiz
    }
};

productController.updateChosenProduct = async(req,res) => {
    try {
        console.log('POST: cont/upateChosenProduct');
        const product = new Product();     
        const id = req.params.id;
        const result = await product.updateChosenProductData(
            id,
            req.body,
            req.member._id);
        await res.json ({state: "success", data: result});

    }catch(err) {
        console.log(`ERROR, cont/updateChosenProduct, ${err.message}`);

    res.json({state: 'fail', message: err.message})

    }
};
