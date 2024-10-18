const { userRegister, userLogin, getUserData, logout } = require("../controllers/auth");
const { verifyJWT } = require("../middlewares/jwt");
const express = require("express");
const router = express.Router();

router.post("/authRegister", userRegister);
router.post("/authLogin", userLogin);
router.post("/authLogout", logout);
router.get("/profile", verifyJWT, getUserData);

module.exports = router;
