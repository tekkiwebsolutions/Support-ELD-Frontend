import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const DriverAdminapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "Driver",
  tagTypes: ["Driver"],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    createDriver: builder.mutation({
      query: (staffData) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: "api/driver/add/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(staffData),
        };
      },
      invalidatesTags: ["Driver"],
    }),
    fetchDriver: builder.query({
      query: (endpoint) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/drivers/list/?page=${endpoint?.page ?? 1}&page_size=${
            endpoint?.pageSize ?? 10
          }&search=${endpoint?.filter}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["Driver"]
    }),
    singleDriver: builder.query({
      query: ({ id }) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/driver/${id}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["Driver"]
    }),
    DropDownDriver: builder.query({
      query: () => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/allcompanyadmin/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
  
    }),
    updateDriver: builder.mutation({
      query: ({ id, updatedData }) => {
        const authtoken = getTokenFromPersistedState();

        return {
          url: `/api/driver/update/${id}/`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(updatedData),
        };
      },
      invalidatesTags:["Driver"]
    }),

    deleteDriver: builder.mutation({
      query: (id) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/driver/delete/${id}/`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
    }),
    invalidatesTags:["Driver"]
  }),
});

export const {
  useCreateDriverMutation,
  useFetchDriverQuery,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
  useSingleDriverQuery,
  useDropDownDriverQuery,
} = DriverAdminapi;
