import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import rootReducer from "../RootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../AuthRtkQueryApi";
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

const persistConfig = {
  key: "root",
  storage,
  // Optionally, you can whitelist specific reducers to be persisted
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Replace rootReducer with your combined reducers

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      portalStaffapi.middleware,
      CompanyAdminapi.middleware,
      DriverAdminapi.middleware,
      Vehicleapi.middleware,
      profileAcccountapi.middleware,
      SideBarItemapi.middleware,
      Permissionsapi.middleware,
      CompanyStaffapi.middleware,
      CompanyDriverapi.middleware,
      SingleCompanyapi.middleware,
      Logsapi.middleware,
    ),
});

const persistor = persistStore(store);

export { store, persistor };
