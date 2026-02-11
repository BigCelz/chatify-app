import React, { useEffect } from "react";
import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex items-center justify-between px-6 h-[84px] border-b border-slate-700/50 bg-slate-800/50">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="avatar online">
          <div className="size-12 rounded-full overflow-hidden">
            <img
              src={selectedUser.profilePic || "/avatar1.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium leading-tight">
            {selectedUser.fullName}
          </h3>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      {/* Right */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-full hover:bg-slate-700/50 transition"
      >
        <XIcon className="size-5 text-slate-400 hover:text-slate-200" />
      </button>
    </div>
  );
};

export default ChatHeader;
