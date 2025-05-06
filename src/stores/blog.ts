import { defineStore } from 'pinia';

import type { Blog } from '@/models';

export const useBlogStore = defineStore('blog', {
  state: (): {
    blogs: Blog[] | null;
    isLoading: boolean;
  } => ({
    blogs: [],
    isLoading: false,
  }),
  actions: {
    async saveBlog(data: Blog): Promise<boolean> {
      try {
        this.isLoading = true;

        const newBlog: Blog = {
          id: data.id,
          title: data.title,
          content: data.content,
          authorId: data.authorId,
          createdAt: data.createdAt,
        };

        this.blogs?.push(newBlog);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Your blog has been published. Thank you :>');
        console.log('Blogs: ', this.blogs);

        return true;
      } catch (error) {
        if (error) {
          throw new Error(error as string);
        }
        return false;
      } finally {
        this.isLoading = false;
        console.log(this.isLoading);
      }
    },
  },
});
