// This file will be used for RTK Query setup.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    // Example endpoint
    getPosts: builder.query({
      query: () => `posts`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPostsQuery } = api;
