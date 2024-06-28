import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignUpValidationSchema } from '@/lib/validation';
import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/shared/Loader';
import {
  useCreateUserAccountMutation,
  useSignInAccountMutation,
} from '@/lib/react-query/queriesAndMutations';

const SignUpForm = () => {
  const { toast } = useToast();
  // const isLoading = false;

  // mutateAsync is the function that's being called inside the form.
  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } =
    useCreateUserAccountMutation();

  const { mutateAsync: signInAccount, isLoading: isSigningIn } =
    useSignInAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidationSchema>>({
    resolver: zodResolver(SignUpValidationSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
    // create a new user
    const newUserAccount = await createUserAccount(values);
    console.log(newUserAccount);
    // console.log(values);
    if (!newUserAccount) {
      return toast({
        title: 'Sign up failed. Please try again.',
      });
    }
    // Next goal: Create a session with the data from the form.
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    console.log(`The session: ${session}`);

    if (!session) {
      return toast({
        title: 'Sign in failed, Please try again',
      });
    }
    // store the session in react context to know if the user is logged in or not.
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Sign up today to explore
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {/* calling "isLoaded" */}
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              'Sign Up'
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/login"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
