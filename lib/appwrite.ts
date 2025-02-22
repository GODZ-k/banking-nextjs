import { cookies } from "next/headers"
import { Account, Client, Databases, Users } from "node-appwrite"


const NEXT_PUBLIC_APPWRITE_URL = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string
const NEXT_PUBLIC_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string
const NEXT_APPWRITE_API_KEY = process.env.NEXT_APPWRITE_KEY as string
export async function createSessionClient() {
    try {
        const client: Client = new Client()
        client.setEndpoint(NEXT_PUBLIC_APPWRITE_URL)
        client.setProject(NEXT_PUBLIC_PROJECT_ID)

        const session = (await cookies()).get("appwrite-session");

        if (!session || !session.value) {
            throw new Error("No session");
        }

        client.setSession(session.value);

        return {
            get account() {
                return new Account(client);
            },
        };
    } catch (error) {
        console.log(error)
    }
}


export async function createAdminClient(){
    try {
        const client  = new Client()
        client.setEndpoint(NEXT_PUBLIC_APPWRITE_URL)
        client.setProject(NEXT_PUBLIC_PROJECT_ID)
        client.setKey(NEXT_APPWRITE_API_KEY)

        return {
            get account(){
                return new Account(client)
            },
            get database(){
                return new Databases(client)
            },
            get user(){
                return new Users(client)
            }
        }

    } catch (error) {
        console.log(error)
    }
}
