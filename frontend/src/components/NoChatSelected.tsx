import React from "react";
import { LuMessageCircle, LuMessageSquare } from "react-icons/lu";

export const NoChatSelected = () => {
  return (
    <div
      className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50"
      style={{ marginBlock: "auto" }}
    >
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <LuMessageSquare
                className="w-10 h-10 rounded-md"
                style={{
                  backgroundColor: "rgb(59, 40, 24)",
                  color: "rgb(166, 96, 52)",
                  padding: "6px",
                  boxSizing: "content-box",
                }}
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="bold" style={{ fontSize: "20px" }}>
          Welcome to Chatty!
        </h2>
        <p style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};
