import express from "express";
const router = express.Router();
import {
  getAllMechanics,
    findOne,
} from "../controllers/mechanics_controllers.js";


// GET /api/mechanics//

router.get("/", getAllMechanics);

// GET /api/mechanics/1 //

router.get("/:id", findOne);



export default router;