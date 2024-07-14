import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Create a new review
const createReview = async (req, res) => {
  try {
    const { services_id, rating, comment, reviewer } = req.body;

    

    const [id] = await knex("reviews").insert({
      services_id,
      rating,
      comment,
      reviewer,
    });

    const newReview = await knex("reviews").where({ id }).first();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review." });
  }
};

const getReviewsByMechanicId = async (req, res) => {
    try {
      const mechanicId = req.params.mechanicId;
  
      const reviews = await knex("reviews")
        .join("services", "reviews.services_id", "services.id")
        .join("mechanics", "services.mechanic_id", "mechanics.id")
        .where({ "mechanics.id": mechanicId })
        .select(
          "reviews.id",
          "reviews.services_id",
          "reviews.reviewer",
          "reviews.comment",
          "reviews.rating",
          "services.type as service_type",
          "services.price as service_price",
          "mechanics.name as mechanic_name",
          "mechanics.location as mechanic_location",

        );
  
      if (reviews.length === 0) {
        return res.status(404).json({
          message: `No reviews found for mechanic with ID ${mechanicId}.`,
        });
      }
  
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({
        message: "Unable to retrieve reviews.",
      });
    }
  };

// Get a single review by ID
const getSingleReview = async (req, res) => {
  try {
    const review = await knex("reviews")
      .join("services", "reviews.services_id", "services.id")
      .where({ "reviews.id": req.params.id })
      .select(
        "reviews.id",
        "reviews.services_id",
        "reviews.reviewer",
        "reviews.comment",
        "reviews.rating"
      )
      .first();

    if (!review) {
      return res.status(404).json({
        message: `Review with ID ${req.params.id} not found.`,
      });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve review.",
    });
  }
};

export {
  createReview,
  getSingleReview,
  getReviewsByMechanicId,
};
