import { combineReducers } from "redux";
import authReducer from "../Slices/Auth";
import { portalStaffapi } from "../PortalStaffRtkQueryApi";
import { CompanyAdminapi } from "../CompanyAdminRtkQueryApi";
import { DriverAdminapi } from "../DriverRtkApi";
import { Vehicleapi } from "../VehicleRtkApi";
import { profileAcccountapi } from "../ProfileAccountRtkApi";
import { SideBarItemapi } from "../SidebarRtkApiQuery";
import { Permissionsapi } from "../Permission";
import { CompanyStaffapi } from "../CompanyStaffRtkApi";

import { CompanyDriverapi } from "../CompanyDrivers";
import { SingleCompanyapi } from "../SingleCompanyViewRtkApi";
import { Logsapi } from "../LogsRTKQueryApi";
// Import other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  [portalStaffapi.reducerPath]: portalStaffapi.reducer,
  [CompanyAdminapi.reducerPath]: CompanyAdminapi.reducer,
  [DriverAdminapi.reducerPath]: DriverAdminapi.reducer,
  [Vehicleapi.reducerPath]: Vehicleapi.reducer,
  [profileAcccountapi.reducerPath]: profileAcccountapi.reducer,
  [SideBarItemapi.reducerPath]: SideBarItemapi.reducer,
  [Permissionsapi.reducerPath]: Permissionsapi.reducer,
  [CompanyStaffapi.reducerPath]: CompanyStaffapi.reducer,
  [CompanyDriverapi.reducerPath]: CompanyDriverapi.reducer,
  [SingleCompanyapi.reducerPath]: SingleCompanyapi.reducer,
  [Logsapi.reducerPath]: Logsapi.reducer,
  // Add other reducers here
});

export default rootReducer;
