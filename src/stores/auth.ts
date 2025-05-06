import { defineStore } from 'pinia';

import { v4 as uuidv4 } from 'uuid';

import type { User } from '@/models';

import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: (): {
    users: User[] | null;
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  } => ({
    users: [],
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  }),
  actions: {
    async signup(data: User): Promise<boolean> {
      try {
        this.isLoading = true;

        if (this.users?.some((u: User) => u.email === data.email)) {
          throw new Error('Email already used');
        }

        const newUser: User = {
          id: data.id,
          email: data.email,
          password: data.password,
        };

        this.users?.push(newUser);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Sign up successful. Please login to your account :>');

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

    async login(data: Omit<User, 'id'>): Promise<boolean> {
      try {
        this.isLoading = true;

        const user = this.users?.find((user: User) => user.email === data.email);

        if (!user) {
          throw new Error('User not found');
        }

        if (user.password !== data.password) {
          throw new Error('Incorrect Password');
        }

        const generatedToken: string = uuidv4();

        this.user = user;
        this.token = generatedToken;
        this.isAuthenticated = true;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log('Login successful');

        return true;
      } catch (error) {
        if (error) {
          throw new Error(error as string);
        }
        return false;
      } finally {
        this.isLoading = false;
        console.log(this.isLoading);

        router.push('/dashboard');
      }
    },

    async logout() {
      this.isLoading = true;

      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.isAuthenticated = false;
      this.user = null;
      this.token = null;

      console.log('Logout successful');

      this.isLoading = false;

      console.log(this.isLoading);

      router.push('/');
    },
  },
});
