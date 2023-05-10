var express = require("express");

var router = express.Router();
var jwt=require("jsonwebtoken");
const upload = require("../utils/upload");
const productController = require("../components/products/controller");
const customerController = require("../components/customers/controller");
const employeeController = require("../components/employee/controller");
const productModel = require("../components/products/model");
const customerModel = require("../components/customers/model");
const employeeModel = require("../components/employee/model");
const notifyModel = require("../components/notification/model");
const tokenModel = require("../components/fcm_tokens/model");
const orderController = require("../components/OrderController");
const storeModel = require("../components/stores/model");
const storeController = require("../components/stores/controller");
const notifyController = require("../components/notification/controller");
const tokenController = require("../components/fcm_tokens/controller")
// import fetch from "node-fetch";
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
/* EMPLOYEE. */
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.get("/logout", function (req, res, next) {
  res.redirect("/login");
});
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.get("/logout", async function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
});

router.get("/products", async function (req, res, next) {
  const name = req.query.name;
  if (name) {
    productModel
      .find({ name: { $regex: new RegExp(name), $options: "i" } })
      .then((data) => {
        res.render("products", { products: data });
      });
  } else {
    const data = await productController.getProducts();
    data.forEach((item) => (item.price = numberWithComma(item.price)));
    res.render("products", { products: data });
  }
});

router.get("/product_insert", async function (req, res, next) {
  const categories = await categoriesController.getCategories();
  const brands = await brandController.getBrands();
  res.render("product_insert", { categories: categories, brands: brands });
});
router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  // tiến hành đăng nhập
  const user = await employeeController.login(username, password);
  if (user) {
    const token = jwt.sign({ id: user._id, username: user.username }, 'mykey');
    req.session.token = token;
    console.log("ok");
    res.redirect("/");
  } else {
    console.log("login wrong");
    res.redirect("/login");
  }
});
router.post("/register", async function (req, res, next) {
  const { username, password, confirmPassword } = req.body;
  const employee = await employeeController.register(username, password, confirmPassword);
  if (employee) {
      res.json({ status: true })
  } else {
      res.json({ status: false })
  }
});
router.post("/", [upload.single("image")], async function (req, res, next) {
  let { body, file } = req;
  const listPro = await productController.getProducts();
  const check = listPro.filter((item) => item.name == body.name);
  if(check.length <=0) {
    let image = "";
    if (file) {
      // image = `http://192.168.43.229/images/${file.filename}`
      image = `http://localhost:3001/images/${file.filename}`;
      body = { ...body, image };
    }
    await productController.insert(body);
    // console.log("req.file", file);
    res.redirect("/products");
  }else{
    res.send(`<script>alert("Sản phẩm đã tồn tại"); window.location.href = "/product_insert"; </script>`);
  };
});

router.delete("/:id/delete", async function (req, res, next) {
  const { id } = req.params;
  await productController.delete(id);
  res.json({ result: true });
});

router.get("/:id/product_update", async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getProductById(id);
  // console.log("product", product);
  const categories = await categoriesController.getCategoriesSelected(
    product.categoryId._id
  );
  const brands = await brandController.getBrandsSelected(product.brandId._id);
  res.render("product_update", {
    product: product,
    categories: categories,
    brands: brands,
  });
});
router.get("/:id/store_update", async function (req, res, next) {
  const { id } = req.params;
  const store = await storeController.getStoreById(id);
  // console.log("product", product);
  
  res.render("store_update", {
    store: store
  });
});
router.post(
  "/:id/product_update",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file, params } = req;
    delete body.image;
    if (file) {
      // let image = `http://192.168.43.229:3001/images/${file.filename}`
      let image = `http://localhost:3001/images/${file.filename}`;
      body = { ...body, image };
    }
    await productController.update(params.id, body);
    res.redirect("/products");
  }
);
router.post(
  "/:id/store_update",
  [upload.single("image")],
  async function (req, res, next) {
    let { body, file, params } = req;
    delete body.image;
    if (file) {
      // let image = `http://192.168.43.229:3001/images/${file.filename}`
      let image = `http://localhost:3001/images/${file.filename}`;
      body = { ...body, image };
    }
    await storeController.update(params.id, body);
    res.redirect("/stores");
  }
);
/* CUSTOMER. */
router.get("/customers", async function (req, res, next) {
  const nameAccount = req.query.nameAccount;
  if (nameAccount) {
    customerModel
      .find({ nameAccount: { $regex: new RegExp(nameAccount), $options: "i" } })
      .then((data) => {
        res.render("customers", { customers: data });
      });
  } else {
    const data = await customerController.getCustomers();
    const customers = data.map((c)=>{
      c={
        ...c,
        idU: c._id.toString().slice(-4)
      }
      return c
    })
    res.render("customers", { customers: customers });
  }
});
/* STORE */
router.get("/stores", async function (req, res, next) {
  const nameStore = req.query.nameStore;
  if (nameStore) {
    storeModel
      .find({ nameStore: { $regex: new RegExp(nameStore), $options: "i" } })
      .then((data) => {
        res.render("stores", { stores: data });
      });
  } else {
    const data = await storeController.getStores();
    const stores = data.map((c)=>{
      c={
        ...c,
        idU: c._id.toString().slice(-4)
      }
      return c
    })
    res.render("stores", { stores: stores });
  }
});
router.get("/notification", async function (req, res, next) {
  const title = req.query.title;
  if (title) {
    notifyModel
      .find({ title: { $regex: new RegExp(title), $options: "i" } })
      .then((data) => {
        res.render("notifications", { notifies: data });
      });
  } else {
    const data = await notifyController.getNotifies();
    const notifies = data.map((c)=>{
      c={
        ...c,
        idU: c._id.toString().slice(-4)
      }
      return c
    })
    console.log('notify',notifies)
    res.render("notifications", { notifies: notifies });
  }
});
router.delete("/:id/deleteCustomer", async function (req, res, next) {
  const { id } = req.params;
  await customerController.delete(id);
  res.json({ result: true });
});

router.get("/orders", orderController.indexweb);
router.get("/orders/:id", orderController.oneweb);
router.post("/orders/:id/status/ok", orderController.ok);
router.post("/orders/:id/status/cancel", orderController.cancel);
router.post("/orders/:id/status/pending", orderController.pending);

// thong ke
router.get("/", function (req, res, next) {
  res.render("home");
});
router.get("/orders/10days/get", orderController.get10DaysAnalysis);
router.get("/orders/all/get", orderController.getAll);
router.get("/orders/sold/get", orderController.getSold);
router.get("/orders/today/get", orderController.getToday);
router.get("/customers/get-all", async function (req, res, next) {
  await customerController
    .getAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => res.json(error));
}); //get all for thong ke

router.get("/products/get-all", async function (req, res, next) {
  await productController
    .getProducts("asc")
    .then((p) => {
      res.json(p);
    })
    .catch((error) => res.json(error));
}); //get all for thong ke

//format
const numberWithComma = (x) => {
  try {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } catch (error) {
    console.log(error);
  }
};
//send notification to app

router.get("/:id/sendToAll",async function(req,res,next){
  const { id } = req.params;
  // const store = await storeController.getStoreById(id);
  // console.log("store", store);
  const customer= await customerController.getCustomerById(id);
  console.log("customer",customer);
  res.render("notification", {
    customer: customer
  });
});
router.get("/sendToAll",async function(req,res,next){
  
  // const store = await storeController.getStoreById(id);
  // console.log("store", store);
  const tokens= await tokenController.getTokens();
  var fcm_tokens=[tokens];
  console.log("token",tokens);
  res.render("sendtoall", {
    tokens: tokens
  });
});
router.post("/:id/sendToAll", async function (req,res,next){
  let { body} = req;
  const { id } = req.params;
  const customer = await customerController.getCustomerById(id);
  const token=customer.tokenFCM;
  const sender="Admin";
 const title=req.body.title;
 const content=req.body.content;
 const server=req.body.key;
  const type=customer.nameAccount;
 body = { ...body, sender ,type};
 const notify = new notifyModel(body);
 console.log('notify',notify);



      // dnw4n3NgRx6JtcSVA6jNiS:APA91bFbHYPEui0Q6kiEnMuaco9Lmr2QkPwAMh-mp3NQUV0tZEgM2OYZN8HoaWMglVSFAjdzS9GpgPKJcKzMclrmyhJMp0OtQxy2EhnV_P-XcTPJeTOm_tlraQG4wVyEsIsIz8U3jbKi
      var notification_body={ "to" : ""+token,
       "collapse_key" : "type_a",
        "notification" : { "body" : ""+content,
         "title": ""+title,
         "image": "https://firebasestorage.googleapis.com/v0/b/fptl-4872d.appspot.com/o/Picture1.jpg?alt=media&token=497a5cbf-48bd-4ccb-a4c8-a590d36fcf51"
        }, 
        
         "data" : { "body" : "First Notification ",
          "title": "Collapsing A",
           "key_1" : "Data for key one",
            "key_2" : "Hellowww" }}
            
  
  fetch('https://fcm.googleapis.com/fcm/send',{
    'method':'POST',
    'headers':{
      // AAAApOYOtpU:APA91bHZ8arumZhz9tbPYspBxpXwF31KizKudMzuo2D1Z_p4AziU0sZhH5Na9Js0kWReYrNBopgRq7Lun8SCBVRIjMCvfTels1oSD6RuG-4TO-L8u740AnDF2YRW_roYS8Ulj_kCWdTB
      'Authorization':'key=AAAApOYOtpU:APA91bHZ8arumZhz9tbPYspBxpXwF31KizKudMzuo2D1Z_p4AziU0sZhH5Na9Js0kWReYrNBopgRq7Lun8SCBVRIjMCvfTels1oSD6RuG-4TO-L8u740AnDF2YRW_roYS8Ulj_kCWdTB',
      'Content-Type':'application/json'
    },
    'body':JSON.stringify(notification_body)
  }).then(async ()=>{
    await notifyController.insert(body);
    console.log('thêm notify thành công',body);
    // res.status(200).send('Notification sent successfully');
    console.log(JSON.stringify(notification_body));
    res.redirect("/notification");
  })
  .catch((err)=>{
    res.status(400).send('Notification sent failed');
    console.log(err);
  });
  
    // console.log("req.file", file);
})
router.post("/sendToAll", async function (req,res,next){
  let { body} = req;
  
  const tokens= await tokenController.getTokens();
  var fcm_tokens=[
    'faIS8wCBTMW1vABLYBwfFs:APA91bEMO1rbvfMHyOjtrmVXB1enYKQ-7cm3xdBq2HJJnczcdTJxb-dS_dIE6ek8F5qKPNvWCUfnnEl5otKZQvDiQNV_pPLTxTCIW3gCjk-q-n53GwUIkfghM0jNz9sdgsLc0Ydf5Z4u',
    'eVkOsmu1SJWy_diFOzVZIv:APA91bEUNpKPu4SEAXk6235I6EoAYjQGZ9APtDg507I2Zzu5u7rl4OfU3aXqfCXfYUEK-Sb7tryRUORdp994WTf73E9iesy1fQgLP-H_bvhmnwsB7sf2H5mnNMmm9KlgM_j55BFR7cyy',
    'fGv8437oSh6L3V-ldr4usr:APA91bGnUVulDlwRA1K632VhcLeCS36Wzg6JdwtUkK8zFGZYx7OC8uGXnGvk7HTaWfuMjDrPN7E6TTw5Li2nbbwuzptNgFTdX3NMDk_21a2hnlikZpmzBjbOLx2nE1tXhGU3WkL06btL'
  ]
  const sender="Admin";
 const title=req.body.title;
 const content=req.body.content;
 const server=req.body.key;
  const type="Tất cả";
 body = { ...body, sender,type };
 const notify = new notifyModel(body);
 console.log('notify',notify);


      // var notification={
      //   'title': ''+title,
      //   'text': ''+content
      // }
      // var notification_body={
      //   'notification': notification,
      //   'registration_ids': fcm_tokens
      // }
      // dnw4n3NgRx6JtcSVA6jNiS:APA91bFbHYPEui0Q6kiEnMuaco9Lmr2QkPwAMh-mp3NQUV0tZEgM2OYZN8HoaWMglVSFAjdzS9GpgPKJcKzMclrmyhJMp0OtQxy2EhnV_P-XcTPJeTOm_tlraQG4wVyEsIsIz8U3jbKi
      var notification_body={ "to" : "/topics/topic",
       "collapse_key" : "type_a",
        "notification" : { "body" : ""+content,
         "title": ""+title,
         "image": "https://firebasestorage.googleapis.com/v0/b/fptl-4872d.appspot.com/o/Picture1.jpg?alt=media&token=497a5cbf-48bd-4ccb-a4c8-a590d36fcf51"
        }, 
        
         "data" : { "body" : "First Notification ",
          "title": "Collapsing A",
           "key_1" : "Data for key one",
            "key_2" : "Hellowww" }}
            
  
  fetch('https://fcm.googleapis.com/fcm/send',{
    'method':'POST',
    'headers':{
      // AAAApOYOtpU:APA91bHZ8arumZhz9tbPYspBxpXwF31KizKudMzuo2D1Z_p4AziU0sZhH5Na9Js0kWReYrNBopgRq7Lun8SCBVRIjMCvfTels1oSD6RuG-4TO-L8u740AnDF2YRW_roYS8Ulj_kCWdTB
      'Authorization':'key='+'AAAApOYOtpU:APA91bHZ8arumZhz9tbPYspBxpXwF31KizKudMzuo2D1Z_p4AziU0sZhH5Na9Js0kWReYrNBopgRq7Lun8SCBVRIjMCvfTels1oSD6RuG-4TO-L8u740AnDF2YRW_roYS8Ulj_kCWdTB',
      'Content-Type':'application/json'
    },
    'body':JSON.stringify(notification_body)
  }).then(async ()=>{
    await notifyController.insert(body);
    console.log('thêm notify thành công',body);
    // res.status(200).send('Notification sent successfully');
    console.log(JSON.stringify(notification_body));
    res.redirect("/notification");
  })
  .catch((err)=>{
    res.status(400).send('Notification sent failed');
    console.log(err);
  });
  
    // console.log("req.file", file);
})
module.exports = router;
