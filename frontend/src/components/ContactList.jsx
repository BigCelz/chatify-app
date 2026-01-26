import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ContactList() {
  const {
    allContacts = [], // default to empty array
    getAllContacts,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  // fetch contacts on mount
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  if (!allContacts.length) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-2">
      {allContacts.map((contact) => {
        const user = contact.user || {}; // safe fallback
        return (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              <div className="avatar online">
                <div className="size-12 rounded-full overflow-hidden">
                  <img
                    src={user.profilePic || "/avatar1.png"}
                    alt={user.fullName || "Unknown"}
                  />
                </div>
              </div>
              <h4 className="text-slate-200 font-medium truncate">
                {user.fullName || "Unknown"}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;

