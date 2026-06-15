import type { CommentType } from "../../../types/comment";
import type { User } from "../../../types/user";

export interface BlogCommentsProps {
  user: User | null;
  comments: CommentType[];
  commentText: string;
  setCommentText: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}