import express from "express";
import fs from "fs";

const router = express.Router();

function readMechanicData() {
    const mechanicData = fs.readFileSync("./data/mechanicData.json");
    const parsedData = JSON.parse(mechanicData);
    return parsedData;
  }

  router.get("/", (req, res) => {
    const mechanics = readMechanicData();
    res.json(mechanics);
  });

  router.get("/:id", (req, res) => {
    const mechanics = readMechanicData();
    const singleMechanic = mechanics.find((mechanic) => mechanic.id.toString() === req.params.id);
    if (singleMechanic) {
      res.json(singleMechanic);
    } else {
      res.status(404).json({
        message: "Please enter a valid ID",
        error: "404",
      });
    }
  });

router.get("/mechanics/services", (req, res) => {
  const mechanics = readMechanicData();

  
  const allServices = [];

 
  mechanics.forEach(mechanic => {
    if (mechanic.services && Array.isArray(mechanic.services)) {
    
      allServices.push(...mechanic.services);
    }
  });

  if (allServices.length > 0) {
    res.json(allServices);
  } else {
    res.status(404).json({
      message: "No services found.",
      error: "404",
    });
  }
});

debugger

router.get("/mechanics/:id/services", (req, res) => {
    const mechanics = readMechanicData();
  
    const mechanic = mechanics.find(mechanic => mechanic.id == req.params.id);
  
    if (!mechanic) {
      return res.status(404).json({
        message: `Mechanic with ID ${req.params.id} not found.`,
      });
    }
    const singleService =  mechanic.services

    
  
    if (singleService) {
      res.json(singleService);
    } else {
      res.status(404).json({
        message: "No services found.",
        error: "404",
      });
    }
  });

  


  function writeMechanicData(data) {
    fs.writeFileSync("./data/mechanicData.json", JSON.stringify(data, null, 2));
  }
  
  router.post("/mechanics/:mechanicId/reviews", (req, res) => {
    const { mechanicId } = req.params;
    const { serviceType, description, reviewer, rating } = req.body;
  
    if (!mechanicId || !serviceType || !description || !reviewer || rating === undefined) {
      return res.status(400).json({
        message: "Please provide mechanicId, serviceType, description, reviewer, and rating.",
      });
    }
  
    const mechanics = readMechanicData();
  
    const mechanic = mechanics.find(mechanic => mechanic.id == mechanicId);
  
    if (!mechanic) {
      return res.status(404).json({
        message: `Mechanic with ID ${mechanicId} not found.`,
      });
    }
  
    const service = mechanic.services.find(service => service.type === serviceType);
  
    if (!service) {
      return res.status(404).json({
        message: `Service type ${serviceType} not found for mechanic with ID ${mechanicId}.`,
      });
    }
  
    const newReview = {
      id: crypto.randomUUID(),
      description,
      reviewer,
      rating
    };
  
    service.reviews.push(newReview);
  
    writeMechanicData(mechanics);
  
    res.status(201).json(newReview);
  });
  
    
    
  
  export default router;