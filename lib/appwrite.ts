import { Client} from "node-appwrite"

const createSessionClient = async()=>{
    try {
        const client:Client = new Client()
        client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL as string)
        client.setProject(process.env.NEXT_PUBLIC_PROJECT_ID as string)
        client.setKey(process.env.NEXT_PUBLIC_API_KEY as string)
    } catch (error) {
        console.log(error)
    }
}