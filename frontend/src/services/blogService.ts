import axiosInstance from "./api";

export const blogApiService = {
  // 1. Hamma bloglarni olish
  getAllBlogs: async () => {
    const response = await axiosInstance.get("/blogs");
    return response.data;
  },

  // 2. Bitta blogni ID orqali olish
  getBlogById: async (id: string | number) => {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
  },

  // 3. Yangi blog yaratish (FormData bilan)
  createBlog: async (formData: FormData) => {
    const response = await axiosInstance.post("/blogs", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Rasm va ma'lumotlar uchun shart
      },
    });
    return response.data;
  },

  // 4. Blogni o'chirish
  deleteBlog: async (id: number) => {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    return response.data;
  },

  // 5. Blogni tahrirlash (Patch)
  editBlog: async (id: number, formData: FormData) => {
    const response = await axiosInstance.patch(`/blogs/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 6. Like bosish va qaytarib olish (Toggle) 🌟
  toggleLike: async (id: string | number) => {
    const response = await axiosInstance.post(`/blogs/${id}/like`);
    return response.data; // Backenddan "Like added" yoki "Like removed" qaytadi
  },

  // 7. Maqolaga tegishli barcha izohlarni olish
  getComments: async (blogId: string | number) => {
    const response = await axiosInstance.get(`/blogs/${blogId}/comments`);
    return response.data;
  },

  // 8. Maqolaga yangi izoh qoldirish
  addComment: async (blogId: string | number, content: string) => {
    // Backend @RequestBody sifatida JSON kutayotgani uchun obyekt ko'rinishida yuboramiz
    const response = await axiosInstance.post(`/blogs/${blogId}/comments`, { content });
    return response.data;
  }
};