export type User = {
  id: string;
  email: string;
  password: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
};
