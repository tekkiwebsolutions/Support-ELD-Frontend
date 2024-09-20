import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const SideBarItemapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "SideBar",

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    
    fetchSideBarItem: builder.query({
      query: () => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/sidebar-items/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
    }),
   
   

    
  }),
});

export const {
useFetchSideBarItemQuery
} = SideBarItemapi;
