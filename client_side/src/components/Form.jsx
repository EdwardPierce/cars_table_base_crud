import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";

import { updateCar, getCarById } from "../api";
import { addNewCar, carUpdated } from "../reducers/carSlice";

export const loader = async ({ params }) => {
  return await params.carId;
};

export const Form = () => {
  const carId = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [characteristicsOfCar, setCharacteristicsOfCar] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
  });

  const carFromStore = useSelector((state) =>
    state.cars.cars.find((car) => car._id == carId)
  );

  const { make, model, year, price } = carFromStore || {};

  useEffect(() => {
    if (carId != 0) {
      setCharacteristicsOfCar({ make, model, year, price });
    }
  }, []);

  // useEffect(() => {
  //   const fetchCarById = async () => {
  //     const { make, model, year, price } = await getCarById(carId);
  //     setCharacteristicsOfCar({ make, model, year, price });
  //   };

  //   if (carId != 0) {
  //     fetchCarById();
  //   }
  // }, [carId]);

  const clear = () => {
    setCharacteristicsOfCar({ make: "", model: "", year: "", price: "" });
  };

  const canSubmit =
    Object.values(characteristicsOfCar).every(Boolean) &&
    addRequestStatus === "idle";

  function handleChange(e) {
    const { name, value } = e.target;
    setCharacteristicsOfCar((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (canSubmit) {
      try {
        setAddRequestStatus("pending");

        if (carId == 0) {
          //add new car in table
          await dispatch(addNewCar(characteristicsOfCar)).unwrap();
        } else {
          //edit
          await updateCar(carId, characteristicsOfCar).then(() => {
            dispatch(
              carUpdated({
                id: carId,
                make: characteristicsOfCar.make,
                model: characteristicsOfCar.model,
                year: characteristicsOfCar.year,
                price: characteristicsOfCar.price,
              })
            );
          });
        }

        clear();
      } catch (error) {
        console.error("Failed to save the car ", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }

    navigate("/");
  }

  return (
    <>
      <h2 className="titleForm"> Create Car</h2>
      <form onSubmit={handleSubmit} className="carForm">
        <label htmlFor="make">Make</label>
        <input
          name="make"
          value={characteristicsOfCar.make}
          onChange={handleChange}
        />
        <label htmlFor="model">Model</label>
        <input
          name="model"
          value={characteristicsOfCar.model}
          onChange={handleChange}
        />
        <label htmlFor="year">Year</label>
        <input
          name="year"
          value={characteristicsOfCar.year}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          name="price"
          value={characteristicsOfCar.price}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" disabled={!canSubmit} />
        <input type="button" value="Reset" onClick={clear} />
      </form>
    </>
  );
};
