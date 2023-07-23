import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteCar } from "../api";
import { fetchCars, selectAllCars, carDeleted } from "../reducers/carSlice";

export function Cars() {
  const dispatch = useDispatch();

  const cars = useSelector(selectAllCars);
  const fetchStatus = useSelector((state) => state.cars.status);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchCars());
    }
  }, [fetchStatus, dispatch]);

  return (
    <>
      <table className="custom-table">
        <caption>Car Spec</caption>

        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Options</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.make} </td>
              <td>{car.model} </td>
              <td>{car.year} </td>
              <td>{car.price} </td>
              <td>
                <Link className="option-button" to={`/create/${car._id}`}>
                  Edit
                </Link>

                <button
                  className="option-button"
                  onClick={() => {
                    //delete car from table
                    deleteCar(car._id).then(() => {
                      dispatch(carDeleted({ id: car._id }));
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
