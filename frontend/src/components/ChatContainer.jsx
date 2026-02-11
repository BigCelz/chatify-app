import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);


  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isSender = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${isSender ? "chat-end" : "chat-start"} `}
                >
                  <div
                    className={`chat-bubble relative ${
                      isSender
                        ? "bg-cyan-600 text-white px-3 py-2"
                        : "bg-slate-800 text-slate-200 px-3 py-2"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="message"
                        className="rounded-lg h-48 object-cover"
                      />
                    )}

                    {msg.text && <p className="mt-2">{msg.text}</p>}

                    <span className="block text-xs opacity-60 mt-1">
                      {new Date(msg.createdAt).toISOString().slice(11, 16)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          isMessagesLoading ? <MessageLoadingSkeleton /> : <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
}

export default ChatContainer;


