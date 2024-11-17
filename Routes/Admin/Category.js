// const CategoryController = require("../../Controller/Admin/Category");
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "Public/Category");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
// router.post("/category", upload.any(), CategoryController.category);
// router.get("/getcategory", upload.any(), CategoryController.getcategory);
// router.delete("/Deletecategory/:Id", CategoryController.Deletecategory);
// router.put("/editcategory", upload.any(),CategoryController.editcategory);
// module.exports = router;
