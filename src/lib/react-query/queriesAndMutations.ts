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
    // mutation function that is going to be called inside the form. from appwrite
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

// Will call after the user is created... For signing in the user into their account
export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      // coming from Appwrite
      signInAccount(user),
  });
};
