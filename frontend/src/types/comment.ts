export type CommentType = {
  id: number;
  user: {
    id: number;
    fullName: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
}