import { createApi } from "@reduxjs/toolkit/query/react";

// Blog Categories Service
export const getBlogCategories = (build) =>
  build.query({
    query: () => ({
      url: "/api/blogs/categories",
      method: "GET",
    }),
    providesTags: ["BlogCategories"],
  });

// Blog Tags Service  
export const getBlogTags = (build) =>
  build.query({
    query: () => ({
      url: "/api/blogs/tags", 
      method: "GET",
    }),
    providesTags: ["BlogTags"],
  });

// Blog CRUD Services
export const getAllBlogs = (build) =>
  build.query({
    query: (params = {}) => ({
      url: "/api/blogs",
      method: "GET",
      params,
    }),
    providesTags: ["Blogs"],
  });

export const getBlogById = (build) =>
  build.query({
    query: (id) => ({
      url: `/api/blogs/admin/${id}`,
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: "Blogs", id }],
  });

export const getBlogBySlug = (build) =>
  build.query({
    query: (slug) => ({
      url: `/api/blogs/${slug}`,
      method: "GET",
    }),
    providesTags: (result, error, slug) => [{ type: "Blogs", slug }],
  });

export const createBlog = (build) =>
  build.mutation({
    query: (data) => ({
      url: "/api/blogs",
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["Blogs"],
  });

export const updateBlog = (build) =>
  build.mutation({
    query: ({ id, ...data }) => ({
      url: `/api/blogs/${id}`,
      method: "PUT",
      body: data,
    }),
    invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
  });

export const deleteBlog = (build) =>
  build.mutation({
    query: (id) => ({
      url: `/api/blogs/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
  });
