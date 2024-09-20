import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

// Retrieve base URL from environment variable
const apiUrl = import.meta.env.VITE_APP_BASE_URL;

// Create the API using createApi
export const SingleCompanyapi = createApi({
  // Configure base query with the base URL
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  // Define the reducer path for this API
  reducerPath: "SingleCompany",
  tagTypes: ["Driver"],
  // Define the endpoints for the API
  endpoints: (builder) => ({
    // Define the fetchSingleCompany endpoint
    fetchSingleCompany: builder.query({
      query: ({ id }) => {
        // Retrieve authentication token
        const authtoken = getTokenFromPersistedState();
        // Return query configuration
        return {
          url: `api/company/?company_admin_id=${id}`, // Construct the URL
          method: "GET", // Set the HTTP method
          headers: {
            "Content-Type": "application/json", // Set content type header
            Authorization: `Bearer ${authtoken}`, // Set authorization header
          },
        };
      },
      providesTags:["SingleCompany"]
    }),
    updateCompany: builder.mutation({
      query: ({ id, updatedData }) => {
        const authtoken = getTokenFromPersistedState();
        
        return {
        url: `/api/company/${id}/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken}`,
        },
        body: JSON.stringify(updatedData),
      }
    },
    invalidatesTags:["SingleCompany"]
    }),
    
  }),
});

// Export hooks to use the query
export const {
  useFetchSingleCompanyQuery,
  useUpdateCompanyMutation
} = SingleCompanyapi;
