// "use client"

// import { useChat } from "ai/react"

// export const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
//     const { messages, handleInputChange, handleSubmit, input } = useChat({
//         api: "/api/chat-stream",
//         body: { sessionId },
//     })

//     return (
//         <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
//             <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
//                 <Messages messages={messages} />

//             </div>

//             <form onSubmit={handleSubmit}>
//                 <input value={input} className="text-black" onChange={handleInputChange} type="text" />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     )
// }
"use client";

import { Message, useChat } from "ai/react";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";

export const ChatWrapper = ({
    sessionId,
    initialMessages,
}: {
    sessionId: string;
    initialMessages: Message[];
}) => {
    const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages,
    });

    return (
        <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                <Messages messages={messages} />
            </div>
            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                setInput={setInput}
            />

        </div>
    );
};