// import { ragChat } from "@/lib/rag-chat";
// import { redis } from "@/lib/redis";
// import { ChatWrapper } from "@/components/ChatWrapper";

// interface pageProps{
//     params:{
//         url:string | string[] | undefined
//     }
// }

// function reconstructUrl({url}: {url: string[]}){
//     const decodedComponents=url.map((component) => decodeURIComponent(component))
//     return decodedComponents.join('/')
// }

// const page = async ({params}: pageProps) =>{
//     const reconstructedUrl = reconstructUrl({url: params.url as string[]})
//     const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

//     const sessionId = "mock-session"

//     if(!isAlreadyIndexed){
//         await ragChat.context.add({
//             type: "html",
//             source: reconstructedUrl,
//             config: {chunkOverlap: 50, chunkSize: 100},
//         })

//         await redis.sadd("indexed-urls",reconstructedUrl)
//     }

//     return <ChatWrapper sessionId={sessionId}/>
// }

// export default page;
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { ChatWrapper } from "@/components/ChatWrapper";
import { Message } from "ai/react"; // Import the Message type

interface pageProps {
    params: {
        url: string | string[] | undefined;
    };
}

function reconstructUrl({ url }: { url: string | string[] | undefined }) {
    if (!url) return "";
    const decodedComponents = Array.isArray(url)
        ? url.map((component) => decodeURIComponent(component))
        : [decodeURIComponent(url)];
    return decodedComponents.join("/");
}

const page = async ({ params }: pageProps) => {
    const reconstructedUrl = reconstructUrl({ url: params.url as string[] });
    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl);

    const sessionId = "mock-session";

    if (!isAlreadyIndexed) {
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: { chunkOverlap: 50, chunkSize: 100 },
        });

        await redis.sadd("indexed-urls", reconstructedUrl);
    }

    // Add initialMessages (empty array if no data available)
    const initialMessages: Message[] = [];  // Placeholder — replace with actual data if needed

    return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />;
};

export default page;
