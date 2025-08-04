import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseRTDBURL = process.env.EXPO_PUBLIC_BASE_RTDB_URL

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseRTDBURL }),
  tagTypes: ['Products', 'Categories'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products.json",
      providesTags: ['Products'],
      transformResponse: (response) => {
        // Convertir el objeto de Firebase a array si es necesario
        if (Array.isArray(response)) {
          return response;
        }
        // Si es un objeto, convertir a array manteniendo las claves como IDs
        return Object.entries(response || {}).map(([key, value]) => ({
          ...value,
          id: value.id || key, // Usar el ID del producto o la clave de Firebase
        }));
      },
    }),
    getCategories: builder.query({
      query: () => "/categories.json",
      providesTags: ['Categories'],
      transformResponse: (response) => {
        if (Array.isArray(response)) {
          return response;
        }
        return Object.entries(response || {}).map(([key, value]) => ({
          ...value,
          id: value.id || key,
        }));
      },
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products.json",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/categories.json",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useAddProductMutation,
  useAddCategoryMutation
} = shopApi;