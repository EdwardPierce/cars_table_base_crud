import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import carRoutes from "./routes/carRouter.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/cars", carRoutes);

async function run() {
  try {
    await mongoose.connect(
      //here add your MongoDB database path
      {
        dbName: //here write the name of the database
      }
    );

    app.listen(5000, () => console.log("Server run on port: " + 5000));
  } catch (error) {
    console.log(error);
  }
}

run();

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("disconnect!!!");
  process.exit();
});
