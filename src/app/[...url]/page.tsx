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
import { v4 as uuidv4 } from 'uuid';
import { JSX } from 'react';

interface PageProps {
    params: {
        url: string | string[] | undefined;
    };
}

function reconstructUrl({ url }: { url: string | string[] | undefined }): string {
    if (!url) return ""; // Handle undefined case
    const decodedComponents = Array.isArray(url)
        ? url.map((component) => decodeURIComponent(component))
        : [decodeURIComponent(url)]; // Handle string case
    return decodedComponents.join("/");
}

const page = async ({ params }: PageProps): Promise<JSX.Element> => {
    const reconstructedUrl = reconstructUrl({ url: params.url });

    const isAlreadyIndexed = (await redis.sismember("indexed-urls", reconstructedUrl)) === 1;

    const sessionId = uuidv4(); // Using UUID for a unique session ID

    try {
        if (!isAlreadyIndexed) {
            await ragChat.context.add({
                type: "html",
                source: reconstructedUrl,
                config: { chunkOverlap: 50, chunkSize: 100 },
            });

            await redis.sadd("indexed-urls", reconstructedUrl);
        }
    } catch (error) {
        console.error("Error adding context or updating Redis:", error);
    }

    return <ChatWrapper sessionId={sessionId} />;
};

export default page;
