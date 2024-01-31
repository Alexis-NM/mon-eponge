const express = require("express");

const router = express.Router();

// const path = require("path");

// const multer = require("multer");

// const uploads = require("./services/upload");

// const uploadPicture = multer({
//   dest: "public/uploads/pictures",
//   fileFilter: (_req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const mimetype = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(
//       `Error: File upload only supports the following filetypes - ${fileTypes}`
//     );
//     return "";
//   },
// });

const stepControllers = require("./controllers/stepControllers");
const validateStep = require("./services/validateStep");

router.get("/steps", stepControllers.browse);
router.get("/steps/:id", stepControllers.read);
router.post("/steps", validateStep, stepControllers.add);
router.put("/steps/:id", validateStep, stepControllers.edit);
router.delete("/steps/:id", stepControllers.destroy);

const tipIngredientControllers = require("./controllers/tipIngredientControllers");
const validateTipIngredient = require("./services/validateTipIngredient");

router.get("/tip_ingredients", tipIngredientControllers.browse);
router.get("/tip_ingredients/:id", tipIngredientControllers.read);
router.post(
  "/tip_ingredients",
  validateTipIngredient,
  tipIngredientControllers.add
);
router.put(
  "/tip_ingredients/:id",
  validateTipIngredient,
  tipIngredientControllers.edit
);
router.delete("/tip_ingredients/:id", tipIngredientControllers.destroy);

const tipControllers = require("./controllers/tipControllers");
const validateTip = require("./services/validateTip");

router.get("/tips", tipControllers.browse);
router.get("/tips/:id", tipControllers.read);
router.post("/tips", validateTip, tipControllers.add);
router.put("/tips/:id", validateTip, tipControllers.edit);
router.delete("/tips/:id", tipControllers.destroy);

const ingredientControllers = require("./controllers/ingredientControllers");
const validateIngredient = require("./services/validateIngredient");

router.get("/ingredients", ingredientControllers.browse);
router.get("/ingredients/:id", ingredientControllers.read);
router.post("/ingredients", validateIngredient, ingredientControllers.add);
router.put("/ingredients/:id", validateIngredient, ingredientControllers.edit);
router.delete("/ingredients/:id", ingredientControllers.destroy);

const userControllers = require("./controllers/userControllers");
const validateUser = require("./services/validateUser");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", validateUser, userControllers.add);
router.put("/users/:id", validateUser, userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

const pictureControllers = require("./controllers/pictureControllers");
const validatePicture = require("./services/validatePicture");

router.get("/pictures", pictureControllers.browse);
router.get("/pictures/:id", pictureControllers.read);
router.post("/pictures", validatePicture, pictureControllers.add);
router.put("/pictures/:id", validatePicture, pictureControllers.edit);
router.delete("/pictures/:id", pictureControllers.destroy);

module.exports = router;
