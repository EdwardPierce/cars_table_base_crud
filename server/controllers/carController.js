import mongoose from "mongoose";

import Car from "../models/car.js";

export async function getCars(req, res) {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getCarById(req, res) {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);

    res.status(200).json(car);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function createCar(req, res) {
  if (!req.body) {
    return console.log(req.body, "if (!req.body) - undefined --- log");
  }

  const { make, model, year, price } = req.body;
  const newCar = new Car({ make, model, year, price });

  try {
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function updateCar(req, res) {
  if (!req.body) {
    console.log("Request body not exist");
    return res.sendStatus(400);
  }

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No car with id: " + id);
  }

  const { make, model, year, price } = req.body;
  const car = await Car.findByIdAndUpdate(
    id,
    { make, model, year, price },
    { new: true }
  );

  if (car) {
    res.json(car);
  } else {
    res.sendStatus(404);
  }
}

export async function deleteCar(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No car with id: " + id);
  }

  await Car.findByIdAndDelete(id);

  res.json({ message: "Car deleted successfully" });
}
