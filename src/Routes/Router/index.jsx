import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Components/DashboardLayout";
import AdminLogin from "../../pages/AuthPage/AdminLogin";
import AdminResetPassword from "../../pages/AuthPage/AdminResetPassword";
import PrivateRoute from "../PrivateRouter";
// import  Users   from "../../pages/Users";
import PublicRouter from "../PublicRouter";
import PortalStaff from "../../pages/PortalStaff";
import AddPostalStaff from "../../pages/AddPortalStaff";
import EditPostalStaff from "../../pages/EditPortalStaff";
import CompanyAdmin from "../../pages/CompanyAdmin";
import AddCompanyAdmin from "../../pages/AddCompanyAdmin";
import EditCompanyAdmin from "../../pages/EditCompanyAdmin";
import Drivers from "../../pages/Drivers";
import AddDrivers from "../../pages/AddDriver";
import EditDriver from "../../pages/EditDriver";
import Vehicle from "../../pages/Vehicle";
import AddVehicle from "../../pages/AddVehicle";
import EditVehicle from "../../pages/EditVehicle";
import ProfileAccount from "../../pages/ProfileAccount";
import CompanyStaff from "../../pages/CompanyStaff/Index";
import NotPageFound from "../../pages/Notpagefound";
import AddCompanyStaff from "../../pages/AddCompanyStaff";
import EditCompanyStaff from "../../pages/EditCompanyStaff";
import CompanyDriver from "../../pages/CompanyDriver";
import CompanyView from "../../pages/CompanyVeiw";
import EditCompany from "../../pages/EditCompany";
import Logs from "../../pages/Logs";
import Events from"../../pages/Events/index"
import Divrs from "../../pages/Dvirs"
import DvirsView from "../../pages/DvirsView";
import DriverView from "../../pages/DriverView";
import LogsView from "../../pages/Logsview";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRouter>
        {" "}
        <Navigate to="/login" />{" "}
      </PublicRouter>
    ), // Redirect root path ("/") to the admin login page
  },
  {
    path: "/login",
    element: (
      <PublicRouter>
        {" "}
        <AdminLogin />
      </PublicRouter>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <PublicRouter>
        <AdminResetPassword />{" "}
      </PublicRouter>
    ),
  },
  {
    // path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "/user", // Define the path for accessing the dashboard from "/user"
        element: <PrivateRoute>{/* <Users /> */}</PrivateRoute>,
        // Render the Users component when accessing "/user"
      },

      {
        path: "/portalstaff",
        element: (
          <PrivateRoute>
            <PortalStaff />
          </PrivateRoute>
        ),
      },

      {
        path: "/addportalstaff",
        element: (
          <PrivateRoute>
            <AddPostalStaff />
          </PrivateRoute>
        ),
      },
      {
        path: "/editportalstaff/:id",
        element: (
          <PrivateRoute>
            <EditPostalStaff />
          </PrivateRoute>
        ),
      },
      {
        path: "/company-admin",
        element: (
          <PrivateRoute>
            <CompanyAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-company-admin",
        element: (
          <PrivateRoute>
            <AddCompanyAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-company-admin/:id",
        element: (
          <PrivateRoute>
            <EditCompanyAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "/driver",
        element: (
          <PrivateRoute>
            <Drivers />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-driver",
        element: (
          <PrivateRoute>
            <AddDrivers />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-driver/:id",
        element: (
          <PrivateRoute>
            <EditDriver />
          </PrivateRoute>
        ),
      },
      {
        path: "/vehicle",
        element: (
          <PrivateRoute>
            <Vehicle />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-vehicle",
        element: (
          <PrivateRoute>
            <AddVehicle />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-vehicle/:id",
        element: (
          <PrivateRoute>
            <EditVehicle />
          </PrivateRoute>
        ),
      },
      {
        path: "/account/:id",
        element: (
          <PrivateRoute>
            <ProfileAccount />
          </PrivateRoute>
        ),
      },
      {
        path: "/company-staff",
        element: (
          <PrivateRoute>
            <CompanyStaff />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-company-staff",
        element: (
          <PrivateRoute>
            <AddCompanyStaff />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-company-staff/:id",
        element: (
          <PrivateRoute>
            <EditCompanyStaff />
          </PrivateRoute>
        ),
      },
      {
        path: "/company-driver",
        element: (
          <PrivateRoute>
            <CompanyDriver />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-company/:id",
        element: (
          <PrivateRoute>
            <EditCompany />
          </PrivateRoute>
        ),
      },
      {
        path: "/company-view",
        element: (
          <PrivateRoute>
            <CompanyView />
          </PrivateRoute>
        ),
      },
      {
        path: "/logs",
        element: (
          <PrivateRoute>
            <Logs />
          </PrivateRoute>
        ),
      },
      {
        path: "/logsview",
        element: (
          <PrivateRoute>
            <LogsView />
          </PrivateRoute>
        ),
      },
      {
        path: "/unidentified-events",
        element: (
          <PrivateRoute>
           <Events/>
          </PrivateRoute>
        ),
      },
      {
        path: "/dvirs",
        element: (
          <PrivateRoute>
          <Divrs/>
          </PrivateRoute>
        ),
      },
      {
        path: "/dvirsview",
        element: (
          <PrivateRoute>
          <DvirsView/>
          </PrivateRoute>
        ),
      },
      {
        path: "/driverview",
        element: (
          <PrivateRoute>
          <DriverView/>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotPageFound />,
  },
]);
export default router;
