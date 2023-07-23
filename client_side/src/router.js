import { createBrowserRouter } from "react-router-dom";

import { Root } from "./routes/Root";
import { Cars } from "./components/Cars";
import { Form, loader as FormLoader } from "./components/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Cars />,
      },
      {
        path: "/create/:carId",
        element: <Form />,
        loader: FormLoader,
      },
    ],
  },
]);

export default router;
