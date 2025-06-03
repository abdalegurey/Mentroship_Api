// //const express= require("express");
// import express from "express";
// import { getposts ,getpostinfo } from "../controllers/posts.js";
// const router = express.Router();



// router.get("/",getposts)
//  router.get("/:id",getpostinfo)


// module.exports = router;

// routes/posts.js
import express from "express";
import { getposts ,getpostinfo} from "../controllers/posts.js";
const router = express.Router();

router.get("/", getposts);
router.get("/:id", getpostinfo);

export default router; // <-- tani waa muhiim haddii aad isticmaalayso import
