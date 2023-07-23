import express from "express";

import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getCarById,
} from "../controllers/carController.js";

const router = express.Router();

router.get("/", getCars);
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
router.get("/:id", getCarById);

export default router;
