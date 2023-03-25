const express = require("express");
const {
  createUser,
  getUser,
  getUserByID,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/registerUser", createUser);
router.post("/getUser", getUser);
router.get("/getUser/:id", getUserByID);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/updateUser/:id", updateUser);

module.exports = router;
