"use server"
import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const adminClient = await createAdminClient();

    if (!adminClient) {
      throw new Error("Failed to initialize client");
    }
    const user = await adminClient.database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    console.log(user)
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const SignIn = async ({ email, password }: signInProps) => {
  try {
    const adminClient = await createAdminClient();

    if (!adminClient) {
      throw new Error("Failed to initialize Appwrite client");
    }

    const session = await adminClient.account.createEmailPasswordSession(
      email,
      password
    );

    if (!session) {
      throw new Error("Failed to create session");
    }

    (await cookies()).set("appwrite-session", session?.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(session);
  } catch (error) {
    console.log(error);
  }
};

export const SignUp = async ({ password, ...userData }: SignUpParams) => {
  try {

    const { email, firstName, lastName } = userData;

    try {

      const { account, database } = await createAdminClient();


      const newUserAccount = await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
      );


      if (!newUserAccount) throw new Error("Error creating user");


      const session = await account.createEmailPasswordSession(email, password)

      if (!session) {
        throw new Error("Failed to create session");
      }

      (await cookies()).set("appwrite-session", session?.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      return parseStringify(newUserAccount);

    //   const dwollaCustomerUrl = await createDwollaCustomer({
    //     ...userData,
    //     type: "personal",
    //   });


    } catch (error) {}
  } catch (error) {
    console.log(error);
  }
};

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete("appwrite-session");

    await account.deleteSession("current");

    return true
  } catch (error) {
    return null
  }
};


export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const result = await account.get();

    //   const user = await getUserInfo({ userId: result.$id})

      return parseStringify(result);
    } catch (error) {
      console.log(error)
      return null;
    }
  }