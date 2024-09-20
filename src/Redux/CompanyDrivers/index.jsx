import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const CompanyDriverapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "CompanyDriver",
  tagTypes: ['CompanyDriver'],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    createCompanyDriver: builder.mutation({
      query: (staffData) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: "api/add-company-admin/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(staffData),
        };
      },
      invalidatesTags: ['CompanyDriver'],
    }),
    fetchCompanyDriver: builder.query({
      query: (endpoint) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/drivers/list/?page=${endpoint?.page ?? 1}&page_size=${endpoint?.pageSize ?? 10}&search=${endpoint?.filter}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["CompanyDriver"]
    }),
    singleCompanyDriver: builder.query({
      query: ({id}) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/company-admin/${id}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["CompanyDriver"]
    }),
    updateCompanyDriver: builder.mutation({
      query: ({ id, updatedData }) => {
        const authtoken = getTokenFromPersistedState();
        
        return {
        url: `/api/company-admin/update/${id}/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authtoken}`,
        },
        body: JSON.stringify(updatedData),
      }
    },
    invalidatesTags: ['CompanyDriver'],
    }),

    deleteCompanyDriver: builder.mutation({
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
    }),
    invalidatesTags: ['CompanyDriver'],
  }),
});

export const {
  useCreateCompanyDriverMutation,
  useFetchCompanyDriverQuery,
  useUpdateCompanyDriverMutation,
  useDeleteCompanyDriverMutation,
  useSingleCompanyDriverQuery
} = CompanyDriverapi;
