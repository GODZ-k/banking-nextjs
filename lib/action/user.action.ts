import { cookies } from "next/headers"
import { createAdminClient, createSessionClient } from "../appwrite"
import { Query } from "node-appwrite";
import { parseStringify } from "../utils";


const {
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: DATABASE_ID,
    NEXT_PUBLIC_USER_COLLECTION_ID: USER_COLLECTION_ID,
    NEXT_PUBLIC_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  } = process.env;
  

export const getUserInfo =async ({userId}:getUserInfoProps)=>{
    try {
        const adminClient = await createAdminClient()
        if(!adminClient){
            throw new Error("Failed to initialize client")
        }
        const user = await adminClient.database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId',[userId])]
        )

        return parseStringify(user.documents[0])

    } catch (error) {
        console.log(error)
    }
}


export const SignIn = async ({email, password}:signInProps)=>{
    try {
        
        const adminClient = await createAdminClient()

        if(!adminClient){
            throw new Error("Failed to initialize Appwrite client")
        }
        const session = await adminClient.account.createEmailPasswordSession(email,password)

        if(!session){
            throw new Error("Failed to create session")
        }

        (await cookies()).set('appwrite-session', session?.secret,{
            path:"/",
            httpOnly:true,
            sameSite:"strict",
            secure:true
        })

        const user = await getUserInfo({userId:session.userId})

        return parseStringify(user)
    } catch (error) {
        console.log(error)
    }
}


export const SignUp = async({password,...userData}:SignUpParams)=>{
    try {
        createSessionClient()
    } catch (error) {
        console.log(error)
    }
}