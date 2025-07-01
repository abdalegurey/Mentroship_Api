//const express= require("express");
import express from "express";
const router = express.Router();

import  {getUsers,getUserInfo, createUser,updateUser,deleteUser,getUserById} from '../controllers/users.js'






router.get('/', getUsers);

router.get("/:id", getUserInfo)

router.post('/create', createUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);
router.get("/getUser/:id",getUserById)

export default router;
// module.exports = router;

//real crud operation



