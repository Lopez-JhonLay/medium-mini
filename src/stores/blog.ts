import { defineStore } from 'pinia';

import type { Blog } from '@/models';

import { useAuthStore } from './auth';

export const useBlogStore = defineStore('blog', {
  state: (): {
    blogs: Blog[] | null;
    isLoading: boolean;
  } => ({
    blogs: [],
    isLoading: false,
  }),
  getters: {
    getBlogsByOthers: (state) => {
      const authStore = useAuthStore();

      return state.blogs?.filter((blog) => blog.authorId !== authStore.user?.id);
    },
  },
  actions: {
    getBlogById(postId: string) {
      return this.blogs?.find((blog) => blog.id === postId);
    },

    async saveBlog(data: Blog): Promise<boolean> {
      try {
        this.isLoading = true;

        const newBlog: Blog = {
          id: data.id,
          title: data.title,
          img_url: data.img_url,
          content: data.content,
          authorId: data.authorId,
          createdAt: data.createdAt,
          tags: data.tags,
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
