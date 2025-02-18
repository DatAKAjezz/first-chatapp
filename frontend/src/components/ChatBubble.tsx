import "../styles/ChatBubble.css";

const ChatBubble = ({
  message,
  sender,
  time,
  avatar,
  isSender,
  showAvatar,
}) => {
  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
      <div className="chat-avatar">
        <img
          style={{ opacity: showAvatar ? "1" : "0" }}
          src={avatar}
          alt="avatar"
        />
      </div>

      <div className="chat-content">
        <div className={`chat-bubble ${isSender ? "chat-bubble-sender" : ""}`}>
          <div className="chat-header">
            {sender} <span className="chat-time">{time}</span>
          </div>
          {message.text && (
            <p
              className="message"
              style={{ backgroundColor: isSender ? "#007bff" : "grey" }}
            >
              {message.text}
            </p>
          )}
          {message.image && (
            <img src={message.image} alt="sent" className="chat-image" />
          )}
        </div>

        {/* <div className="chat-footer">{isSender ? "Seen" : "Delivered"}</div> */}
      </div>
    </div>
  );
};

export default ChatBubble;
