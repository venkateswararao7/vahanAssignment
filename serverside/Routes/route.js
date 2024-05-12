import expres from "express";
import userdata from "../controllers/getuserdata.js";
import insertdata from "../controllers/insertdata.js";
import deleteuser from "../controllers/deleteuser.js";

const router = expres.Router();

router.get("/users", userdata);
router.post("/insert", insertdata);
router.delete("/delete", deleteuser);

export default router;