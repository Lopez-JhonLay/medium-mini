export type User = {
  id: string;
  email: string;
  password: string;
};

export type Blog = BlogForm & {
  id: string;
  authorId: string;
  createdAt: string;
};

export type BlogForm = {
  title: string;
  content: string;
  tags: string[];
  img_url: string;
};
