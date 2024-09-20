import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const CompanyAdminapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "CompanyAdmin",
  tagTypes: ['CompanyAdmin'],

  endpoints: (builder) => ({
    // CRUD endpoints for staff
    createCompanyAdmin: builder.mutation({
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
      invalidatesTags: ['CompanyAdmin'],
    }),
    fetchCompanyAdmin: builder.query({
      query: (endpoint) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/company-admin/list/?page=${endpoint?.page ?? 1}&page_size=${endpoint?.pageSize ?? 10}&search=${endpoint?.filter}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags:["CompanyAdmin"]
    }),
    singleCompanyAdmin: builder.query({
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
      providesTags:["CompanyAdmin"]
    }),
    updateCompanyAdmin: builder.mutation({
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
    invalidatesTags: ['CompanyAdmin'],
    }),

    deleteCompanyAdmin: builder.mutation({
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
    invalidatesTags: ['CompanyAdmin'],
  }),
});

export const {
  useCreateCompanyAdminMutation,
  useFetchCompanyAdminQuery,
  useUpdateCompanyAdminMutation,
  useDeleteCompanyAdminMutation,
  useSingleCompanyAdminQuery
} = CompanyAdminapi;
