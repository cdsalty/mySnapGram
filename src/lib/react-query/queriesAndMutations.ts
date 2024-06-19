import {
  // useQuery,
  useMutation,
  // useQueryClient,
  // useInfinityQuery,
} from '@tanstack/react-query';
import { createUserAccount, signInAccount } from '../appwrite/api';
import { INewUser } from '@/types';

// For creating the user
export const useCreateUserAccountMutation = () => {
  return useMutation({
    // mutation function is what we're actually going to call
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

// For signing in the user into their account
export const useSignInAccountMutation = () => {
  return useMutation({
    // mutation function is what we're actually going to call
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
