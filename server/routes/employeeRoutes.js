const {
  addEmployee,
  getAllEmployeesOfUser,
  editEmployeeDetails,
  deleteEmployee,
} = require("../controllers/employeeController");
const decodeToken = require("../middleware/decodeToken");
const {
  employeeValidator,
  employeeValidatorHandler,
} = require("../middleware/employeeValidator");

const router = require("express").Router();

router.post(
  "/",
  decodeToken,
  employeeValidator,
  employeeValidatorHandler,
  addEmployee
);

router.get("/", decodeToken, getAllEmployeesOfUser);

router.patch("/", decodeToken, editEmployeeDetails);
router.delete("/:employeeId", decodeToken, deleteEmployee);
module.exports = router;
