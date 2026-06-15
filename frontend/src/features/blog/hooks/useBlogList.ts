import { useState, useEffect, useMemo } from "react";
import { blogApiService } from "../../../services/blogService";
import type { BlogPost } from "../../../types/blog";

export const useBlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogApiService
      .getAllBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Bloglarni yuklashda xatolik:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const titleMatch = blog.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = blog.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = titleMatch || descMatch;
      
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  return {
    filteredBlogs,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    loading,
  };
};