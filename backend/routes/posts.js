const express = require("express");
const Post = require("../models/post");
const Order = require("../models/order");

const multer = require("multer");

const router = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime Type");
    error = isValid ? null : error;
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(url);
    console.log("req body",req.body.type)
    const post = new Post({
      
      type: req.body.type,
      name:req.body.name,
       image: url + "/images/" + req.file.filename,
      estimatedprice:req.body.estimatedprice,
      price:req.body.price,
      fabric:req.body.fabric,
      clothtype:req.body.clothtype,
      description:req.body.description,
      extrainfo:req.body.extrainfo,
      color:req.body.color,
    });
    post.save().then(createdPost => {
      console.log("createdPost",createdPost); 
      res.status(201).json({
        message: "Post added successfully!",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);


router.post(
  "/order",
  (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host");
    // console.log(url);
    console.log("req body",req.body)
    const post = new Order({
    
      userid:req.body.userid,
      prodname:req.body.prodname,
      Quantity:req.body.Quantity,
      address:req.body.address,
      prodid:req.body.prodid,
      image:req.body.image,
      contactNumber:req.body.contactNumber,


    });
    post.save().then(createdPost => {
      console.log("createdPost",createdPost);
      res.status(201).json({
        message: "Order added successfully!",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);



router.post(
  "/user",
  (req, res, next) => {
   
    console.log("req body",req.body)
    const post = new User({
    
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      contactnumber:req.body.contactnumber,
     
    });
    post.save().then(createdPost => {
      console.log("createdPost",createdPost);
      res.status(201).json({
        message: "user added successfully!",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);





router.get("", (req, res, next) => {
   
    const postQuery=Post.find()
    let fetchedPosts;
    postQuery.then(documents=>
      {
        fetchedPosts = documents
        console.log("fetchedPosts",fetchedPosts)
        res.status(200).json({data : fetchedPosts})
      })

    });


    
router.get("/order", (req, res, next) => {
   
  const postQuery=Order.find()
  let fetchedPosts;
  postQuery.then(documents=>
    {
      fetchedPosts = documents
      console.log("fetchedPosts",fetchedPosts)
      res.status(200).json({data : fetchedPosts})
    })

  });
    
  router.get("/:id", (req, res, next) => {

    console.log("id updated")
    Post.findById({ _id: req.params.id }).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "page not found!" });
      }
    });
  });

  
  router.delete("/:id", (req, res, next) => {
    console.log(req.params.id)
    Order.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json({ message: "deleted!" });
    });
  });

  // router.put(
  //   "/:id",
  //   multer({ storage: storage }).single("image"),
  //   (req, res, next) => {
  //     let imagePath = req.body.imagePath;
  //     if (req.file) {
  //       const url = req.protocol + "://" + req.get("host");
  //       imagePath = url + "/images/" + req.file.filename;
  //     }
  //     const post = new Post({
  //       _id: req.params.id,
  //       title: req.body.title,
  //       content: req.body.content,
  //       imagePath: imagePath
  //     });
  //     Post.updateOne({ _id: req.params.id }, post).then(result => {
  //       res.status(200).json({ message: "updated!" });
  //     });
  //   }
  // );


module.exports = router;
