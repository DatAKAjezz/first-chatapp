import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Status } from "@chakra-ui/react";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div style={{ padding: "10px", boxShadow: "3px 3px 2px rgb(24, 14, 23)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                className="rounded-full h-28 w-28 aspect-square"
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 style={{ fontSize: "16px" }} className="bold font-medium">
              {selectedUser.fullName}
            </h3>
            <p
              className="text-sm text-base-content/70"
              style={{ fontSize: "14px" }}
            >
              {onlineUsers.includes(selectedUser._id) ? (
                <Status.Root colorPalette="green">
                  <Status.Indicator />
                  Online
                </Status.Root>
              ) : (
                <Status.Root colorPalette="gray">
                  <Status.Indicator />
                  Offline
                </Status.Root>
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          className="cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};
