import type { BlogPost } from "../../../types/blog";

export interface BlogTableProps {
  posts: BlogPost[];
  onDelete: (id: number, title: string) => void;
  onEditClick: (post: BlogPost) => void; // Buni qo'shish shart
}