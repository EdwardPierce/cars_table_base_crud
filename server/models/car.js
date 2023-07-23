import { Schema, model } from "mongoose";

const carSchema = new Schema(
  {
    make: String,
    model: String,
    year: String,
    price: String,
  },
  { versionKey: false }
);

const Car = model("Car", carSchema);

export default Car;
