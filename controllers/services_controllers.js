import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// Get list of all services
const getAllservices = async (_req, res) => {
  try {
    const data = await knex('services').select('id', 'mechanic_id', 'type', 'price', 'category');
    res.status(200).json(data);
  } catch (e) {
    res.status(400).send(`Error retrieving services: ${e}`);
  }
};

// Get services for a single mechanic
const getServicesByMechanic = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await knex('services').where({ mechanic_id: id }).select('id', 'type', 'price', 'mechanic_id');
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving services for mechanic ${id}: ${error.message}`);
  }
};


const getMechanicsByService = async (req, res) => {
    const { serviceId } = req.params;
    try {
      const mechanics = await knex('mechanics')
        .join('services', 'mechanics.id', '=', 'services.mechanic_id')
        .where('services.id', serviceId)
        .select('mechanics.id', 'mechanics.name', 'mechanics.image_path', 'mechanics.location');
      res.status(200).json(mechanics);
    } catch (error) {
      res.status(400).send(`Error retrieving mechanics for service ${serviceId}: ${error.message}`);
    }
  };


  const getMechanicsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      const mechanics = await knex("mechanics")
        .join("services", "mechanics.id", "services.mechanic_id")
        .where("services.category", category)
        .select(
          "mechanics.id",
          "mechanics.name",
          "mechanics.location",
          "mechanics.image_path",
          "services.type",
          "services.price",
          "services.category"
        )
        .distinct();
  
      res.status(200).json(mechanics);
    } catch (error) {
      console.error(`Error fetching mechanics for category "${category}":`, error);
      res.status(500).json({ error: "Failed to fetch mechanics" });
    }
  };

 
export {
    getMechanicsByCategory,
    getMechanicsByService,
  getServicesByMechanic,
  getAllservices,
};
