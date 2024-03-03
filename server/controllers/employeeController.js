const User = require("../models/userSchema");
const Employee = require("../models/employeeSchema");
const addEmployee = async (req, res) => {
  const { userId } = req;
  const { email, name, image, gender, designation, course, phoneNumber } =
    req.body;
  if (!userId) {
    return res.sendStatus(401);
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newEmployee = new Employee({
      email,
      name,
      course,
      designation,
      image,
      gender,
      phoneNumber,
    });
    await newEmployee.save();
    await User.findByIdAndUpdate(userId, {
      $push: { employees: newEmployee._id },
    });
    res.status(200).json(newEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

const getAllEmployeesOfUser = async (req, res) => {
  const { userId } = req;
  if (!userId) {
    return res.status(401).json({ message: "userId is not present" });
  }
  try {
    const user = await User.findById(userId).populate("employees");
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    const employees = user.employees;
    return res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editEmployeeDetails = async (req, res) => {
  const { userId } = req;
  const { email, name, image, gender, designation, course, phoneNumber } =
    req.body;
  if (!userId) {
    return res.sendStatus(401);
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const employee = await Employee.findOneAndUpdate(
      { email },
      {
        email,
        name,
        image,
        gender,
        designation,
        course,
        phoneNumber,
      },
      { new: true }
    );
    res.status(200).json({ employee });
  } catch (error) {}
};
const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;
  const { userId } = req;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $pull: {
        employees: employeeId,
      },
    });
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
    res.status(200).json(deletedEmployee);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error, unable to delete" });
  }
};
module.exports = {
  addEmployee,
  getAllEmployeesOfUser,
  editEmployeeDetails,
  deleteEmployee,
};
