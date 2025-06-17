import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import LogIn from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AvailableFood from "../pages/availableFood/AvailableFood";
import PrivateRoute from "../routes/PrivateRoute";
import ViewDetail from "../pages/ViewDetail/ViewDetail";
import MyRequestFood from "../pages/MyRewuestFood/MyRequestFood";
import AddFood from "../pages/AddFood/AddFood";
import MyFood from "../pages/MyFood/MyFood";
import UpdateFood from "../pages/UpdateFood/UpdateFood";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "availableFoods",
        element: (
          <PrivateRoute>
            <AvailableFood></AvailableFood>
          </PrivateRoute>
        ),
        loader: () => fetch("https://server-site-alpha-umber.vercel.app/foods"),
      },
      {
        path: "/foodDetail/:id",
        Component: ViewDetail,
        loader: ({ params }) =>
          fetch(`https://server-site-alpha-umber.vercel.app/foods/${params.id}`).then((res) =>
            res.json()
          ),
      },

      {
        path: "/myFoodRequest",
        element: (
          <PrivateRoute>
            <MyRequestFood></MyRequestFood>
          </PrivateRoute>
        ),
        loader: () => fetch("https://server-site-alpha-umber.vercel.app/requestedFoods"),
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/myFood",
        element: (
          <PrivateRoute>
            <MyFood></MyFood>
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://server-site-alpha-umber.vercel.app/foods"),
      },
      {
        path: "updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://server-site-alpha-umber.vercel.app/foods/${params.id}`),
      },
      {
        path: "register",
        Component: SignUp,
      },
      {
        path: "signIn",
        Component: LogIn,
      },
    ],
  },
]);

export default router;
