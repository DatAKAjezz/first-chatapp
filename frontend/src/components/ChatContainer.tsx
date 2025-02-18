import * as React from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { useChatStore } from "@/store/useChatStore";
import { Spinner } from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { useAuthStore } from "@/store/useAuthStore";

export const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subcribeToMessages,
    unsubcribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  React.useEffect(() => {
    getMessages(selectedUser?._id);
    subcribeToMessages();
    return () => unsubcribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    unsubcribeFromMessages,
    subcribeToMessages,
  ]);

  React.useEffect(() => {
    if (refChatContainer.current) {
      refChatContainer.current.scrollTo({
        top: refChatContainer.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const refChatContainer = React.useRef<any>(null);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="w-full h-full flex items-center justify-center">
          <Spinner color="blue.500" borderWidth="4px" />
          &nbsp;Loading...
        </div>
        <MessageInput />
      </div>
    );

  return (
    <div className="relative flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div ref={refChatContainer} className="w-full h-full overflow-y-scroll">
        <div className="text-center" style={{ marginBlock: "3rem" }}>
          <h1 className="bold" style={{ color: "grey" }}>
            Let's talk
          </h1>
          <p style={{ fontSize: "10px", color: "grey" }}>
            Be brave! Just say hello and you will make it.
          </p>
        </div>
        {messages.map((message: any, index: any) => {
          const prevMessage = messages[index - 1];
          const showAvatar =
            !prevMessage || prevMessage.senderId !== message.senderId;

          return (
            <ChatBubble
              key={message._id}
              sender={message.fullName}
              time={message.createdAt}
              message={message}
              avatar={
                message.senderId === selectedUser._id
                  ? selectedUser.profilePic
                  : authUser.profilePic
              }
              isSender={message.senderId !== selectedUser._id}
              showAvatar={showAvatar}
            />
          );
        })}
        <div style={{ marginBottom: "100px" }}></div>
      </div>
      <div className="absolute bottom-0 w-full">
        <MessageInput />
      </div>
    </div>
  );
};
