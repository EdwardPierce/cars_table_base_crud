import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCars, createCar } from "../api";

const initialState = {
  cars: [],
  status: "idle",
  error: null,
};

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await getCars();
  return response;
});

export const addNewCar = createAsyncThunk("cars/addNewCar", async (car) => {
  const response = await createCar(car);
  return response;
});

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    carDeleted(state, action) {
      const { id } = action.payload;

      state.cars = state.cars.filter((car) => car._id != id);
    },
    carUpdated(state, action) {
      const { id, make, model, year, price } = action.payload;

      const existingCar = state.cars.find((car) => car._id == id);

      if (existingCar) {
        existingCar.make = make;
        existingCar.model = model;
        existingCar.year = year;
        existingCar.price = price;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCars.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.cars = state.cars.concat(action.payload);
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      });
  },
});

export const { carDeleted, carUpdated } = carsSlice.actions;

export default carsSlice.reducer;

export const selectAllCars = (state) => state.cars.cars;
