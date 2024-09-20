import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromPersistedState } from "../../ulits/Commonfuction";

const apiUrl = import.meta.env.VITE_APP_BASE_URL;
export const Logsapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "Logs",
  tagTypes: ["Logs"],

  endpoints: (builder) => ({
    // CRUD endpoints for staff

    fetchLogs: builder.query({
      query: ({ page = 1, pageSize = 10, filter = "" }) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `api/logs/list/?page=${page}&page_size=${pageSize}&search=${filter}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
        providesTags: ["Logs"],
    }),
    singlefetchLogs: builder.query({
      query: ({ id }) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/logs/${id}/`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      providesTags: ["Logs"],
    }),
    updateLogs: builder.mutation({
      query: ({ id, updatedData }) => {
        const authtoken = getTokenFromPersistedState();

        return {
          url: `/api/logs/update/${id}/`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
          body: JSON.stringify(updatedData),
        };
      },
      invalidatesTags: ["Logs"],
    }),

    deleteLogs: builder.mutation({
      query: (id) => {
        const authtoken = getTokenFromPersistedState();
        return {
          url: `/api/logs/delete/${id}/`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authtoken}`,
          },
        };
      },
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const { useFetchLogsQuery } = Logsapi;
