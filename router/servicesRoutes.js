import express from "express";
const router = express.Router();
import {
    getMechanicsByCategory,
   
    getMechanicsByService,
    getServicesByMechanic,
  getAllservices,
} from "../controllers/services_controllers.js";


// GET /api/services //

router.get("/", getAllservices);

// GET /api/services/1 //

router.get("/:id/services", getServicesByMechanic);

router.get('/:serviceId/mechanics', getMechanicsByService);

// router.get("/categories", getAllCategories);

router.get('/mechanics/category/:category', getMechanicsByCategory);


export default router;

