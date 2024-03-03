const { check, validationResult } = require("express-validator");
const Employee = require("../models/employeeSchema");
const employeeValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid emial address")
    .trim()
    .custom(async (value) => {
      try {
        const empolyee = await Employee.findOne({ email: value });
        if (empolyee) {
          throw new "there is an employee already associated with it"();
        }
        Error;
      } catch (error) {
        throw error;
      }
    }),
  check("phoneNumber")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Please enter valid phone numbers"),
  check("name")
    .isLength({ min: 3 })
    .withMessage("the length of the name should of 3 characters"),
  check("course").notEmpty().withMessage("The course should not empty"),
  check("gender").notEmpty().withMessage("the gender should not be empty"),
  check("designation")
    .notEmpty()
    .withMessage("the designation should not be empty"),
];

const employeeValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErros = errors.mapped();
  if (Object.keys(mappedErros).length === 0) {
    return next();
  }
  res
    .status(400)
    .json({ errors: Object.values(mappedErros).map((error) => error.msg) });
};

module.exports = { employeeValidator, employeeValidatorHandler };
