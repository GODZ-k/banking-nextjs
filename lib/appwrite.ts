import { cookies } from "next/headers"
import { Account, Client, Databases, Users } from "node-appwrite"

export async function createSessionClient() {
    try {
        const client: Client = new Client()
        client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL as string)
        client.setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string)

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
        client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL as string)
        client.setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string)
        client.setKey(process.env.NEXT_PUBLIC_API_KEY as string)

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
