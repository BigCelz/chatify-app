// import React, { useEffect } from "react";
// import { useChatStore } from "../store/useChatStore";
// import UserLoadingSkeleton from "./UserLoadingSkeleton";
// import NoChatsFound from "./NoChatsFound";

// function ContactList() {
//   const { allContacts, getAllContacts, setSelectedUser, isContactsLoading } =
//     useChatStore();

//   useEffect(() => {
//     getAllContacts();
//   }, []);

//   if (isContactsLoading) return <UserLoadingSkeleton />;
//   if (!allContacts.length) return <NoChatsFound />;

//   return (
//     <div className="flex flex-col gap-2">
//       {allContacts.map((contact) => {
//         const user = contact.user || {};
//         return (
//           <div
//             key={contact._id}
//             className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
//             onClick={() => setSelectedUser(user)}

//           >
//             <div className="flex items-center gap-3">
//               <div className="avatar online">
//                 <div className="size-12 rounded-full overflow-hidden">
//                   <img
//                     src={user.profilePic || "/avatar1.png"}
//                     alt={user.fullName || "Unknown"}
//                   />
//                 </div>
//               </div>
//               <h4 className="text-slate-200 font-medium truncate">
//                 {user.fullName || "Unknown"}
//               </h4>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default ContactList;

import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ContactList() {
  const {
    allContacts,
    getAllContacts,
    setSelectedUser,
    isContactsLoading,
  } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, []);

  if (isContactsLoading) return <UserLoadingSkeleton />;
  if (!allContacts.length) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-2">
      {allContacts.map((user) => (
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
                  alt={user.fullName || "Unknown"}
                />
              </div>
            </div>

            <h4 className="text-slate-200 font-medium truncate">
              {user.fullName || "Unknown"}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;

