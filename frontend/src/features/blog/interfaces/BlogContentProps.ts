import type { BlogPost } from "../../../types/blog";

export interface BlogContentProps {
  post: BlogPost;
  pdfRef: React.RefObject<HTMLDivElement | null>;
}