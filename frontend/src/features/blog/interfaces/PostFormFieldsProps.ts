import type { BlogCategory } from "../../../types/blog";

export 
interface PostFormFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  category: BlogCategory;
  setCategory: (val: BlogCategory) => void;
  description: string;
  setDescription: (val: string) => void;
}