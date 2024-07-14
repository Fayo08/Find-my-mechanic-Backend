import express from "express";
const router = express.Router();
import {
  createReview,
  getReviewsByMechanicId,
  getSingleReview,
} from "../controllers/reviews_controller.js";

// POST /api/reviews //
router.post("/", createReview);

// GET /api/reviews/1 //
router.get("/:id", getSingleReview);

router.get('/mechanics/:mechanicId/reviews', getReviewsByMechanicId);

export default router;



