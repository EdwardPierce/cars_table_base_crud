import { configureStore } from "@reduxjs/toolkit";

import CarsReducer from "../reducers/carSlice";

export default configureStore({
  reducer: {
    cars: CarsReducer,
  },
});
