import React from "react";

const MessageLoadingSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      {[...Array(6)].map((_, index) => {
        const isSender = index % 2 === 0; // alternate left & right

        return (
          <div
            key={index}
            className={`chat ${isSender ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble px-3 py-3 ${
                isSender
                  ? "bg-cyan-600/40"
                  : "bg-slate-800/60"
              }`}
            >
              <div className="h-4 w-32 bg-white/20 rounded mb-2"></div>
              <div className="h-4 w-20 bg-white/20 rounded"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageLoadingSkeleton;

