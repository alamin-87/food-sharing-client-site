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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    //   {
    //     path: "/foodDetail/:id",
    //     Component: ViewDetail,
    //     loader: ({ params }) =>
    //       fetch(`http://localhost:3000/foods/${params.id}`),
    //   },
      //   {
      //       path: 'jobApply/:id',
      //       element: <PrivateRoute><JobApply></JobApply></PrivateRoute>
      //   },
        {
          path: "availableFoods",
          element: (
            <PrivateRoute>
              <AvailableFood></AvailableFood>
            </PrivateRoute>
          ),
          loader: () => fetch("http://localhost:3000/foods"),
        },
      {
        path: "/foodDetail/:id",
        Component: ViewDetail,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/foods/${params.id}`).then((res) =>
            res.json()
          ),
      },
      {
        path: "/myFoodRequest/:id",
        Component: MyRequestFood,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/foods/${params.id}`).then((res) =>
            res.json()
          ),
      },

      {
          path:'/myFoodRequest',
          element: <PrivateRoute><MyRequestFood></MyRequestFood></PrivateRoute>
      },
      {
          path: 'addFood',
          element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      // {
      //     path: 'applications/:job_id',
      //     element: <PrivateRoute><ViewApplications></ViewApplications></PrivateRoute>,
      //     loader: ({params}) => fetch(`http://localhost:3000/applications/job/${params.job_id}`)
      // },
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
