import { useChatStore } from "@/store/useChatStore";
import * as React from "react";
import SidebarSkeleton from "./skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button, Status } from "@chakra-ui/react";

export const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = React.useState<boolean>(false);
  
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  // React.useEffect(() => {
  //   setFilteredUsers(users.filter((user: any) => onlineUsers.includes(user._id)).map((user: any) => user))
  // }, [showOnlineOnly, users]);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-black flex flex-col transition-all duration-200">
      {/* <div className="flex items-center flex-col box-content" style={{padding: "4px", boxSizing: "content-box"}}>
        <Button onClick={() => {setShowOnlineOnly(prev => !prev)}}>Button</Button>
      </div> */}
      <div className="border-b border-black w-full p-5"></div>
      <div
        className="flex items-center gap-2"
        style={{ padding: "20px", boxShadow: "3px 0px 2px rgb(24, 14, 23)" }}
      >
        <Users className="size-6" />
        <span
          className="font-medium w-full hidden lg:block"
          style={{ fontSize: "13px" }}
        >
          Contacts
        </span>
      </div>

      <div
        className="overflow-y-auto h-full w-full py-3"
        style={{ boxShadow: "3px 3px 2px rgb(24, 14, 23)" }}
      >
        {users?.map((user: any) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
            }}
            className={`cursor-pointer  w-full p-3 flex items-center gap-3 transition-colors`}
            style={{
              paddingLeft: "10px",
              paddingBlock: "5px",
              backgroundColor:
                user?._id === selectedUser?._id ? "rgb(24, 14, 23)" : "inherit",
              color: user?._id === selectedUser?._id ? "green" : "inherit",
            }}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full aspect-square"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="truncate" style={{ fontSize: "16px" }}>
                {user.fullName}
              </div>
              <div
                className="text-sm text-zinc-400"
                style={{ fontSize: "12px" }}
              >
                {onlineUsers.includes(user._id) ? (
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
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
