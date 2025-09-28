
// This file will be used for RTK Query setup.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['ArtPieces', 'Categories', 'Bookings', 'Clients', 'Testimonials', 'Gallery', 'Workshops', 'Faqs'],
  endpoints: (builder) => ({
    // Auth Endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // ArtPieces Endpoints
    getArtPieces: builder.query({
      query: () => 'art-pieces',
      providesTags: ['ArtPieces'],
    }),
    addArtPiece: builder.mutation({
      query: (body) => ({
        url: 'art-pieces',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ArtPieces'],
    }),
    updateArtPiece: builder.mutation({
      query: ({ id, body }) => ({
        url: `art-pieces/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['ArtPieces'],
    }),
    deleteArtPiece: builder.mutation({
      query: (id) => ({
        url: `art-pieces/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ArtPieces'],
    }),

    // Categories Endpoints
    getCategories: builder.query({
      query: () => 'categories',
      providesTags: ['Categories'],
    }),
    addCategory: builder.mutation({
      query: (body) => ({
        url: 'categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),

    // Bookings Endpoints
    getBookings: builder.query({
      query: () => 'bookings',
      providesTags: ['Bookings'],
    }),
    updateBooking: builder.mutation({
      query: ({ id, body }) => ({
        url: `bookings/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Bookings'],
    }),
    
    // Clients Endpoints
    getClients: builder.query({
      query: () => 'clients',
      providesTags: ['Clients'],
    }),
    addClient: builder.mutation({
      query: (body) => ({
        url: 'clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Clients'],
    }),
    updateClient: builder.mutation({
      query: ({ id, body }) => ({
        url: `clients/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Clients'],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),

    // Testimonials Endpoints
    getTestimonials: builder.query({
        query: () => 'testimonials',
        providesTags: ['Testimonials'],
    }),
    addTestimonial: builder.mutation({
        query: (body) => ({
            url: 'testimonials',
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Testimonials'],
    }),
    updateTestimonial: builder.mutation({
        query: ({ id, body }) => ({
            url: `testimonials/${id}`,
            method: 'PUT',
            body,
        }),
        invalidatesTags: ['Testimonials'],
    }),
    deleteTestimonial: builder.mutation({
        query: (id) => ({
            url: `testimonials/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Testimonials'],
    }),

    // Gallery Endpoints
    getGalleryImages: builder.query({
        query: () => 'gallery',
        providesTags: ['Gallery'],
    }),
    addGalleryImage: builder.mutation({
        query: (body) => ({
            url: 'gallery',
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Gallery'],
    }),
    updateGalleryImage: builder.mutation({
        query: ({ id, body }) => ({
            url: `gallery/${id}`,
            method: 'PUT',
            body,
        }),
        invalidatesTags: ['Gallery'],
    }),
    deleteGalleryImage: builder.mutation({
        query: (id) => ({
            url: `gallery/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Gallery'],
    }),

    // Workshops Endpoints (assuming static for now as per file, but adding mutations)
    getWorkshops: builder.query({
        query: () => 'workshops',
        providesTags: ['Workshops'],
    }),
    addWorkshop: builder.mutation({
        query: (body) => ({
            url: 'workshops',
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Workshops'],
    }),
    updateWorkshop: builder.mutation({
        query: ({ id, body }) => ({
            url: `workshops/${id}`,
            method: 'PUT',
            body,
        }),
        invalidatesTags: ['Workshops'],
    }),
    deleteWorkshop: builder.mutation({
        query: (id) => ({
            url: `workshops/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Workshops'],
    }),

    // FAQs Endpoints (assuming static for now as per file, but adding mutations)
    getFaqs: builder.query({
        query: () => 'faqs',
        providesTags: ['Faqs'],
    }),
    addFaq: builder.mutation({
        query: (body) => ({
            url: 'faqs',
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Faqs'],
    }),
    updateFaq: builder.mutation({
        query: ({ id, body }) => ({
            url: `faqs/${id}`,
            method: 'PUT',
            body,
        }),
        invalidatesTags: ['Faqs'],
    }),
    deleteFaq: builder.mutation({
        query: (id) => ({
            url: `faqs/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Faqs'],
    }),

  }),
});

// Export hooks for usage in functional components
export const { 
    useLoginMutation,
    useGetArtPiecesQuery,
    useAddArtPieceMutation,
    useUpdateArtPieceMutation,
    useDeleteArtPieceMutation,
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetBookingsQuery,
    useUpdateBookingMutation,
    useGetClientsQuery,
    useAddClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
    useGetTestimonialsQuery,
    useAddTestimonialMutation,
    useUpdateTestimonialMutation,
    useDeleteTestimonialMutation,
    useGetGalleryImagesQuery,
    useAddGalleryImageMutation,
    useUpdateGalleryImageMutation,
    useDeleteGalleryImageMutation,
    useGetWorkshopsQuery,
    useAddWorkshopMutation,
    useUpdateWorkshopMutation,
    useDeleteWorkshopMutation,
    useGetFaqsQuery,
    useAddFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
} = api;
