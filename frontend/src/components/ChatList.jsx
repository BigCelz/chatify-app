import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatList() {
  const { chats, getMyChatPartners, setSelectedUser, isChatsLoading } =
    useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isChatsLoading) return <UserLoadingSkeleton />;
  if (!chats?.length) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-2">
      {chats.map((user) => (
        <div
          key={user._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(user)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={user.profilePic || "/avatar1.png"}
                  alt={user.fullName || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h4 className="text-slate-200 font-medium truncate">
              {user.fullName || "User"}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;

