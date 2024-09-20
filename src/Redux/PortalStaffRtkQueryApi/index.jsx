import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const portalStaffapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "PortalStaff",
  tagTypes: ['PortalStaff'],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    createStaff: builder.mutation({
      query: (staffData) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: "api/add-portal-staff/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(staffData),
        };
      },
      invalidatesTags:["PortalStaff"]
    }),
    fetchStaff: builder.query({
      query: ({ page = 1, pageSize = 10, filter = "" }) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/portal-staff/list/?page=${page}&page_size=${pageSize}&search=${filter}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags: ['PortalStaff'],
    }),
    singlefetchStaff: builder.query({
      query: ({id}) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/portal-staff/${id}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["PortalStaff"]
    }),
    updateStaff: builder.mutation({
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
    },
    invalidatesTags:["PortalStaff"]
    }),

    deleteStaff: builder.mutation({
      query: (id) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/portal-staff/delete/${id}/`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      invalidatesTags:["PortalStaff"]
    }),
    
  }),
});

export const {
  useLoginMutation,
  useCreateStaffMutation,
  useFetchStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useSinglefetchStaffQuery
} = portalStaffapi;
