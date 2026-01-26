import React from "react";
import { useChatStore } from "../store/useChatStore";
import { MessageCircleIcon } from "lucide-react";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();
 return (
    <div className="flex flex-col items-center justify-center text-white py-16 space-y-6">
      <div className="w-20 h-20 flex items-center justify-center bg-cyan-500/10 rounded-full">
        <MessageCircleIcon className="w-10 h-10 text-cyan-400" />
      </div>
      <div className="text-center">
        <h4 className="text-xl text-slate-200 font-semibold mb-2">
          No Conversations Yet
        </h4>
        <p className="text-slate-400 text-sm px-6">
          Start a new conversation or select an existing one
        </p>
      </div>
      <button
        className="px-6 py-2 text-sm font-medium text-cyan-400 bg-cyan-800/20 rounded-lg hover:bg-cyan-500/20 transition-colors"
        onClick={() => setActiveTab("contacts")}
      >
        Find Contacts
      </button>
    </div>
  );
}

export default NoChatsFound;
