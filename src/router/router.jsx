import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import LogIn from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AvailableFood from "../pages/availableFood/AvailableFood";
import PrivateRoute from "../routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      // {
      //     path:'/jobs/:id',
      //     Component: JobDetails,
      //     loader: ({params}) => fetch(`http://localhost:3000/jobs/${params.id}`)
      // },
      // {
      //     path: 'jobApply/:id',
      //     element: <PrivateRoute><JobApply></JobApply></PrivateRoute>
      // },
      {
        path: "availableFoods",
        element: (
          <PrivateRoute>
            <AvailableFood></AvailableFood>
          </PrivateRoute>
        ),
        loader: () => fetch("http://localhost:3000/foods"),
      },

      // {
      //     path:'addJob',
      //     element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
      // },
      // {
      //     path: 'myPostedJobs',
      //     element: <PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
      // },
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
