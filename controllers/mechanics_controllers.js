import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);



// to get list of all mechanics
const getAllMechanics = async (_req, res) => {
    try {
      const data = await knex
        .select(
          "id",
          "name",
          "image_path",
          "location"
        )
        .from("mechanics");
      res.status(200).json(data);
    } catch (e) {
      res.status(400).send(`Error retrieving mechanics: ${e}`);
    }
  };


// to get a specific mechanic based on id; includes all information
const findOne = async (req, res) => {
    try {
      const mechanicFound = await knex("mechanics").where({
        id: Number(req.params.id),
      });
  
      if (mechanicFound.length === 0) {
        return res.status(404).json({
          message: `User with ID ${req.params.id} not found`,
        });
      }
      const mechanicData = mechanicFound[0];
      res.json(mechanicData);
    } catch (e) {
      res.status(500).json({
        message: `Unable to retrieve mechanic data for mechanic with ID ${req.params.id}`,
      });
    }
  };






export {

    getAllMechanics,
    findOne,
  };