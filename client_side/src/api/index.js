const url = "http://localhost:5000/cars";

export async function getCars() {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function getCarById(id) {
  try {
    const response = await fetch(`${url}/${id}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function createCar(car) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (response.ok) {
      const _car = await response.json();
      return _car;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateCar(id, car) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function deleteCar(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const deletedCar = await response.json();
      console.log(deletedCar);
    }
  } catch (error) {
    console.log(error.message);
  }
}
