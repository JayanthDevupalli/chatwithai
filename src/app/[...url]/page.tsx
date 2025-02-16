import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { ChatWrapper } from "@/components/ChatWrapper";

interface pageProps{
    params:{
        url:string | string[] | undefined
    }
}

function reconstructUrl({url}: {url: string[]}){
    const decodedComponents=url.map((component) => decodeURIComponent(component))
    return decodedComponents.join('/')
}

const page = async ({params}: pageProps) =>{
    const reconstructedUrl = reconstructUrl({url: params.url as string[]})

    //console.log(params.url);
    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    const sessionId = "mock-session"

    if(!isAlreadyIndexed){
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: {chunkOverlap: 50, chunkSize: 100},
        })

        await redis.sadd("indexed-urls",reconstructedUrl)
    }

    return <ChatWrapper sessionId={sessionId}/>
}

export default page;