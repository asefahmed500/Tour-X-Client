import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";
import NavBar from "../components/NavBar/NavBar";
import OurPackages from "../Pages/OurPackages/OurPackages";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import Booking from "../components/Bookings/Booking";
import Dashboard from "../components/Dashboard/Dashboard";

import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes";
import Bookings from "../components/Dashboard/Bookings/Bookings";
import UserHome from "../components/Dashboard/UserHome/UserHome";
import Paymnet from "../components/Dashboard/Payment/Paymnet";
import PaymentHistory from "../components/Dashboard/Payment/PaymentHistory/PaymentHistory";
import Allusers from "../components/Dashboard/Allusers/Allusers";
import AddReview from "../components/Dashboard/AddReview/AddReview";
import ManagePackage from "../components/Dashboard/ManagePackage/ManagePackage";
import UpdatePackage from "../components/Dashboard/UpdatePackage/UpdatePackage";
import AddPackage from "../components/Dashboard/AddPackage/AddPackage";
import Guides from "../components/Guides/Guides";
import GuidesDetails from "../components/Guides/GuidesDetails";
import MyAssignedTours from "../components/Dashboard/MyAssignedTours/MyAssignedTours";
import GuideRoutes from './../components/GuideRoutes/GuideRoutes';
import ForgetPassword from './../components/ForgetPassword/ForgetPassword';
import AdminHome from "../components/Dashboard/AdminHome/AdminHome";
import GuideHome from "../components/Dashboard/GuideHome/GuideHome";

import AddGuide from "../components/Dashboard/AddGuides/AddGuide";
import AdminRoutes from './../components/AdminRoutes/AdminRoutes';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "navbar",
        element: <NavBar />,
      },
      {
        path: "/ourpackages",
        element: <OurPackages />,
      },
      {
        path: "/bookings/:tourType",
        element: <Booking />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword></ForgetPassword>

      },

      {
        path: "/guides",
        element: <Guides></Guides>
      },
      {
        path: "/guides/:_id",
        element: <GuidesDetails></GuidesDetails>,
        loader: ({ params }) => fetch(`https://tourist-guide-server-navy.vercel.app/guides/${params._id}`)
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "booking",
        element: <Bookings></Bookings>
      },
      {
        path: "userhome",
        element: <UserHome></UserHome>

      },
      {
        path: "payment",
        element: <Paymnet></Paymnet>

      },
      {
        path: "review",
        element: <AddReview></AddReview>
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "adminhome",
        element: <AdminRoutes> <AdminHome></AdminHome></AdminRoutes>

      },
      {
        path: "allusers",
        element: <AdminRoutes><Allusers></Allusers></AdminRoutes>

      },
      {
        path: "managepackage",
        element: <AdminRoutes><ManagePackage></ManagePackage></AdminRoutes>

      },
      {
        path: "addguides",
        element: <AdminRoutes><AddGuide></AddGuide></AdminRoutes>

      },
      {
        path: "addpackage",
        element: <AdminRoutes><AddPackage></AddPackage></AdminRoutes>

      },

      {
        path: "updatepackage/:id",
        element: <UpdatePackage></UpdatePackage>,
        loader: ({ params }) => fetch(`https://tourist-guide-server-navy.vercel.app/package/${params.id}`)
      },
      {
        path: "myprofile",
        element: <GuideRoutes><GuideHome></GuideHome></GuideRoutes>
        
      },
      {
        path: "myassignedtours",
        element: <GuideRoutes> <MyAssignedTours></MyAssignedTours></GuideRoutes>
      }


    ],
  },
]);
