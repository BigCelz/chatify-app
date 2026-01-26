import React from "react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="flex justify-center gap-2 p-2 rounded-lg m-2 bg-transparent">
      <button
        className={`p-3 w-full rounded-xl transition-colors ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-200"
            : "text-slate-400 hover:bg-slate-700/20 hover:text-slate-200"
        }`}
        onClick={() => setActiveTab("chats")}
      >
        Chats
      </button>

      <button
        className={`p-3 w-full rounded-xl transition-colors ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-200"
            : "text-slate-400 hover:bg-slate-700/20 hover:text-slate-200"
        }`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
