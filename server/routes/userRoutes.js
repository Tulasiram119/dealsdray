const { register, login } = require("../controllers/userController");
const {
  addUserValidationHandler,
  adduserValidaor,
} = require("../middleware/userValidator");

const router = require("express").Router();

router.post("/register", adduserValidaor, addUserValidationHandler, register);

router.post("/login", login);

module.exports = router;
