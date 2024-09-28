import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { postJob,getASingleJob,deleteJob,getAllJobs,getMyJobs} from "../controllers/jobController.js";

const router = express.Router();
// job can be posted by employer
router.post("/post",isAuthenticated,isAuthorized("Employer"),postJob);
router.get("/getall",getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"),getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"),deleteJob);
router.get("/get/:id", isAuthenticated, getASingleJob);
// router.put("/update/:id", isAuthenticated, updateJob);

export default router;
 