import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const Vehicleapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "vehicle",
  tagTypes: ["vehicle"],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    createVehicle: builder.mutation({
      query: (staffData) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: "api/vehicles/add/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(staffData),
        };
      },
      invalidatesTags: ["vehicle"],
    }),
    fetchVehicle: builder.query({
      query: (endpoint) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/vehicles/list/?page=${endpoint?.page ?? 1}&page_size=${
            endpoint?.pageSize ?? 10
          }&search=${endpoint?.filter}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["vehicle"]
    }),
    singleVehicle: builder.query({
      query: ({ id }) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/vehicles/detail/${id}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["vehicle"]
    }),
    DropDownVehicle: builder.query({
      query: () => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/alldrivers/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["Driver"]
    }),
    updateVehicle: builder.mutation({
      query: ({ id, updatedData }) => {
        const authtoken = getTokenFromPersistedState();

        return {
          url: `/api/vehicles/update/${id}/`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(updatedData),
        };
      },
      invalidatesTags:["vehicle"]
    }),

    deleteVehicle: builder.mutation({
      query: (id) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/vehicles/delete/${id}/`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      invalidatesTags:["vehicle"]
    }),
  }),
});

export const {
    useFetchVehicleQuery,
    useCreateVehicleMutation,
    useSingleVehicleQuery,
    useDeleteVehicleMutation,
    useUpdateVehicleMutation,
    useDropDownVehicleQuery

} = Vehicleapi;
