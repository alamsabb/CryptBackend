const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.service");
const {
  register,
  login,
  admninRegister,
  adminLogin,
  verifyAccount,
  request,
  amountPending,
  ammountSend,
  profile,
  userTransaction,
} = require("../controllers/Auth/auth.controller");

router.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello World");
});

router.post("/register", register);

router.post("/login", login);

router.post("/adminRegister", admninRegister);

router.post("/loginAdmin", adminLogin);

router.put("/verify/:id", verifyAccount);

router.get("/profile/:id", profile);

router.get("/request", request);

router.get("/Transaction", amountPending);

router.put("/Transaction/:id", ammountSend);

router.get("/userTransaction/:id", userTransaction);

router.post("/upload", upload.single("customeName"), (req, res) => {
  // console.log(req.body);
  res.send("File Uploaded");
});

module.exports = router;
