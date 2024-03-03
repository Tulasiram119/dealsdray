const { check, validationResult } = require("express-validator");

const adduserValidaor = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("Username should be 5 characters"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 characters length"),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res
      .status(400)
      .json({ errors: Object.values(mappedErrors).map((error) => error.msg) });
  }
};

module.exports = { adduserValidaor, addUserValidationHandler };
