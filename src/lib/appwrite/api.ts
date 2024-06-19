import { ID } from 'appwrite';

import { INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases } from './config';

// for authentication purposes
export const createUserAccount = async (user: INewUser) => {
  console.log(`{The user object: ${user}`);
  try {
    // 1. "create" a new user account:
    const newAccount = await account.create(
      ID.unique(), // user id
      user.email,
      user.password,
      // user.username,
      user.name
    );

    if (!newAccount) throw Error('User account not created');

    // 2. get user's avatar initials:
    const avatarUrl = avatars.getInitials(user.name);

    // 3a: save the user to the database:
    const newUser = await saveUserToDB({
      accountId: newAccount.$id, // following appwrite's convention
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: user.username, // why is this coming from the user object? It's not originally passed from the form data. The answer is that it's not in the interface, but it is in the form data. The form data is the user object. Explain why the imageUrl is coming from the avatarUrl variable. The avatarUrl variable is the result of the getInitials function, which is a function that returns a URL. The URL is the image URL of the user's avatar. The avatar is the user's initials. It's being called user.username because I am not passing it down when I create the account.
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 3b. Save the user to the database:
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newAccountUser = await databases.createDocument(
      appwriteConfig.databaseId, // to know which database that's going to be modified.
      appwriteConfig.userCollectionId, // to know which collection that's going to be modified.
      ID.unique(), // the user object's id
      user // the user object
    );
    return newAccountUser;
  } catch (error) {
    console.log({
      'There is an error coming from the saveUserToDB function:': error,
    });
  }
}

// 4. Sign in the user:
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log(error);
  }
}
