import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 export const apiUrl = import.meta.env.VITE_APP_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  reducerPath: "adminAuth",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/login/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
