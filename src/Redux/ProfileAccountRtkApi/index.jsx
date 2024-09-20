import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const profileAcccountapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "profileAcccount",
  tagTypes: ['profileAcccount'],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    
    fetchProfileAccount: builder.query({
      query: ({usertype,id}) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/user-details/${usertype}/${id}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
    }),
    
    updateProfileAccount: builder.mutation({
      query: ({ id, updatedData }) => {
        const authtoken = getTokenFromPersistedState();
        
        return {
        url: `/api/portal-staff/update/${id}/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken}`,
        },
        body: JSON.stringify(updatedData),
      }
    }
    }),

    
  }),
});

export const {
useFetchProfileAccountQuery,
useUpdateProfileAccountMutation
} = profileAcccountapi;
