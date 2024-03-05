const express = require("express");

const router = express.Router();

/* ******************************* MiddleWare ****************************** */

const { hashPassword, verifyToken, checkIsAdmin } = require("./services/auth");
const validateStep = require("./services/validateStep");
const validateTipIngredient = require("./services/validateTipIngredient");
const validateTip = require("./services/validateTip");
const validateIngredient = require("./services/validateIngredient");
const validateUser = require("./services/validateUser");
const validatePicture = require("./services/validatePicture");
const uploadPicture = require("./services/uploadPicture");

/* ******************************* Controllers ****************************** */

const authControllers = require("./controllers/authControllers");
const stepControllers = require("./controllers/stepControllers");
const tipIngredientControllers = require("./controllers/tipIngredientControllers");
const tipControllers = require("./controllers/tipControllers");
const ingredientControllers = require("./controllers/ingredientControllers");
const userControllers = require("./controllers/userControllers");
const pictureControllers = require("./controllers/pictureControllers");

/* ******************************* Login ****************************** */

router.post("/login", authControllers.login);

/* ******************************* Steps ****************************** */

router.get("/steps", stepControllers.browse);
router.get("/steps/:id", stepControllers.read);
router.post("/steps", verifyToken, validateStep, stepControllers.add);
router.put("/steps/:id", verifyToken, validateStep, stepControllers.edit);
router.delete("/steps/:id", verifyToken, stepControllers.destroy);

/* ******************************* Tip Ingredients ****************************** */

router.get("/tip_ingredients", tipIngredientControllers.browse);
router.get("/tip_ingredients/:id", tipIngredientControllers.read);
router.post(
  "/tip_ingredients",
  verifyToken,
  validateTipIngredient,
  tipIngredientControllers.add
);
router.put(
  "/tip_ingredients/:id",
  verifyToken,
  checkIsAdmin,
  validateTipIngredient,
  tipIngredientControllers.edit
);
router.delete(
  "/tip_ingredients/:id",
  verifyToken,
  checkIsAdmin,
  tipIngredientControllers.destroy
);

/* ******************************* Tips ****************************** */

router.get("/tips", tipControllers.browse);
router.get("/tips/:id", tipControllers.read);
router.post("/tips", verifyToken, validateTip, tipControllers.add);
router.put(
  "/tips/:id",
  verifyToken,
  checkIsAdmin,
  validateTip,
  tipControllers.edit
);
router.delete("/tips/:id", verifyToken, checkIsAdmin, tipControllers.destroy);

/* ******************************* Ingredients ****************************** */

router.get("/ingredients", ingredientControllers.browse);
router.get("/ingredients/:id", ingredientControllers.read);
router.post(
  "/ingredients",
  verifyToken,
  validateIngredient,
  ingredientControllers.add
);
router.put(
  "/ingredients/:id",
  verifyToken,
  checkIsAdmin,
  validateIngredient,
  ingredientControllers.edit
);
router.delete(
  "/ingredients/:id",
  verifyToken,
  checkIsAdmin,
  ingredientControllers.destroy
);

/* ******************************* Users ****************************** */

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", hashPassword, validateUser, userControllers.add);
router.put("/users/:id", verifyToken, validateUser, userControllers.edit);
router.delete("/users/:id", verifyToken, userControllers.destroy);

/* ******************************* Pictures ****************************** */

router.get("/pictures", pictureControllers.browse);
router.get("/pictures/:id", pictureControllers.read);
router.post(
  "/pictures",
  uploadPicture,
  verifyToken,
  checkIsAdmin,
  validatePicture,
  pictureControllers.add
);

router.put(
  "/pictures/:id",
  verifyToken,
  checkIsAdmin,
  validatePicture,
  pictureControllers.edit
);
router.delete(
  "/pictures/:id",
  verifyToken,
  checkIsAdmin,
  pictureControllers.destroy
);

module.exports = router;
