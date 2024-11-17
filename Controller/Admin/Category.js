// const CategoryModal = require("../../Model/Admin/Category");

// class Category {
//   // post method
//   async category(req, res) {
//     try {
//       let { SubcatImage, CategoryName, SubcatName } = req.body;
//       let file = req.files[0]?.filename;

//       const newcategory = new CategoryModal({
//         CategoryName,
//         SubcatImage: file,
//         SubcatName,
//       });
//       newcategory.save().then((data) => {
//         return res.status(200).json({ success: "Data Added Successfully" });
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ msg: "Data Cannot be added" });
//     }
//   }
//   // get method
//   async getcategory(req, res) {
//     try {
//       const getcategory = await CategoryModal.find({});
//       if (getcategory) {
//         return res.status(200).json({ getcategory: getcategory });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   //delete method
//   async Deletecategory(req, res) {
//     try {
//       const deletecategory = req.params.Id;
//       await CategoryModal.deleteOne({ _id: deletecategory });
//       return res.status(200).json({ success: "Deleted Successfully" });
//     } catch (error) {
//       console.log(error);
//       return res.status(400).json({ msg: "Cannot be Deleted" });
//     }
//   }
//   //update method
//   async editcategory(req, res) {
//     let { id, SubcatImage, CategoryName, SubcatName } = req.body;
//     let file = req.files[0]?.filename;
//     let obj = {};
//     if (CategoryName) {
//       obj["CategoryName"] = CategoryName;
//     }
//     if (file) {
//       obj["SubcatImage"] = file;
//     }
//     if (SubcatName) {
//       obj["SubcatName"] = SubcatName;
//     }
//     try {
//       let data = await CategoryModal.findByIdAndUpdate(
//         { _id: id },
//         { $set: obj },
//         { new: true }
//       );
//       if (!data) return res.status(400).json({ error: "Data not found" });
//       return res.status(200).json({ success: "Successfully Updated" });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// const CategoryController = new Category();
// module.exports = CategoryController;
