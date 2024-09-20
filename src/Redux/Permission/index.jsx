import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const Permissionsapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "permission",
  tagTypes: ["permission"],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    
    fetchPermission: builder.query({
      query: (endpoint) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/permissions/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["permission"]
    }),
   
   
   

}), 
});

export const {
useFetchPermissionQuery
} = Permissionsapi;
