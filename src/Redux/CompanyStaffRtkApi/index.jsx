import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const CompanyStaffapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "CompanyStaff",
  tagTypes: ['CompanyStaff'],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    createCompanyStaff: builder.mutation({
      query: (staffData) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: "api/add-company-staff/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(staffData),
        };
      },
      invalidatesTags: ['CompanyStaff'],
    }),
    fetchCompanyStaff: builder.query({
      query: (endpoint) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/company-staff/list/?page=${endpoint?.page ?? 1}&page_size=${endpoint?.pageSize ?? 10}&search=${endpoint?.filter}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["CompanyStaff"]
    }),
    singleCompanyStaff: builder.query({
      query: ({id}) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/company-staff/${id}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["CompanyStaff"]
    }),
    updateCompanyStaff: builder.mutation({
      query: ({ id, updatedData }) => {
        const authtoken = getTokenFromPersistedState();
        
        return {
        url: `/api/company-staff/update/${id}/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken}`,
        },
        body: JSON.stringify(updatedData),
      }
    },
    invalidatesTags: ['CompanyStaff'],
    }),

    deleteCompanyStaff: builder.mutation({
      query: (id) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/company-staff/delete/${id}/`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
    }),
    providesTags: ['CompanyStaff'],
  }),
});

export const {
    useCreateCompanyStaffMutation,
    useFetchCompanyStaffQuery,
    useSingleCompanyStaffQuery,
    useUpdateCompanyStaffMutation,
    useDeleteCompanyStaffMutation
} = CompanyStaffapi;

