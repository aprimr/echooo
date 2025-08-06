import { DocumentData } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiInfo, FiSend, FiX } from "react-icons/fi";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { TiWarning } from "react-icons/ti";
import { auth } from "../firebase/config";
import { getMessages, sendMessage } from "../lib/echoooRoom";
import MessagesSkeleton from "./chats/MessagesSkeleton";
import { HiOutlineDotsVertical, HiOutlineReply } from "react-icons/hi";

interface ChatBubbleProps {
  message: string;
  userName: string;
  userImage?: string;
  createdAt: { seconds: number; nanoseconds: number };
  reactions?: string[];
}

const formatTime = (timestamp: { seconds: number; nanoseconds: number }) => {
  if (!timestamp) return "";
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const EchoooRoom = () => {
  const [showRules, setShowRules] = useState<boolean>(false);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const unsubscribe = getMessages((msgs) => setMessages(msgs));
    return () => unsubscribe();
  }, []);

  // Scroll to the bottom of the chat instantly on page mount
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

  // Scroll to the bottom of the chat smoothly on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    const currentUser = auth.currentUser;
    if (!message.trim() || !currentUser) return;
    const messageText = message.trim();

    // Clear input field
    setMessage("");

    try {
      await sendMessage({
        message: messageText,
        userId: currentUser.uid,
        userName: currentUser.displayName || "",
        userImage: currentUser.photoURL || "",
        replyToMessageId: null,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const isSender = (userId: string) => {
    const currentUser = auth.currentUser;
    return currentUser && currentUser.uid === userId;
  };

  return (
    <div className="max-w-md mx-auto min-h-[100svh] bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200 sm:border-x-[1.4px] sm:border-neutral-300 relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md flex items-center justify-between px-5 py-4 border-b sm:border-x-[1.4px] sm:border-neutral-300 border-gray-200 bg-white/90 backdrop-blur-sm z-20 h-16">
        <div className="flex items-center gap-1 min-w-0">
          <button
            aria-label="Go back"
            onClick={() => window.history.back()}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-all"
          >
            <FiChevronLeft size={22} />
          </button>
          <div className="h-11 w-11 mr-1 flex justify-center items-center rounded-full bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-blue-400/80 text-white shadow-sm">
            <HiOutlineChatBubbleLeftRight size={20} />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-base font-semibold text-gray-800 truncate max-w-[150px] font-nunito">
              Echooo Room
            </h1>
            <p className="text-xs text-blue-400 font-poppins font-medium gap-1">
              Public group
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Show Rules"
            className="p-1.5 rounded-lg flex justify-center items-center text-gray-600 hover:bg-gray-100/80 transition-colors"
            onClick={() => setShowRules((prev) => !prev)}
          >
            {showRules ? (
              <FiX size={20} className="text-gray-700" />
            ) : (
              <TiWarning size={20} className="text-rose-500" />
            )}
          </button>
          <button
            aria-label="Info"
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors"
          >
            <FiInfo size={20} />
          </button>
        </div>
      </header>

      {/* Rules ribbon */}
      {showRules && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-md z-30 mx-auto flex items-center gap-1 shadow-sm bg-rose-500 text-white px-5 py-2">
          <TiWarning size={15} className="flex-shrink-0" />{" "}
          <div className="text-xs font-medium font-poppins truncate">
            No spam • Stay respectful • Keep your info safe
          </div>
        </div>
      )}

      {/* Loading */}
      {messages.length === 0 ? (
        <MessagesSkeleton />
      ) : (
        <main className="overflow-y-auto pt-20 pb-18 h-[100svh] w-full px-4 space-y-5 scrollbar-hidden bg-gradient-to-b from-white to-gray-50">
          {messages.map((msg) =>
            isSender(msg.userId) ? (
              <SentChatBubble
                key={msg.id}
                message={msg.message}
                userName={msg.userName}
                createdAt={msg.createdAt}
                reactions={msg.reactions}
              />
            ) : (
              <ReceivedChatBubble
                key={msg.id}
                message={msg.message}
                userName={msg.userName}
                userImage={msg.userImage}
                createdAt={msg.createdAt}
                reactions={msg.reactions}
              />
            )
          )}
          <div ref={messagesEndRef} />
        </main>
      )}

      {/* Message Input */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t sm:border-x-[1.4px] border-neutral-300 px-4 py-2 sm:px-5 sm:py-3 bg-white/90 backdrop-blur-sm flex items-center gap-2 sm:gap-3 z-10 h-18">
        <input
          type="text"
          value={message}
          maxLength={500}
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-3 border-2 border-gray-300 bg-neutral-50 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-200 focus:border-neutral-300 text-gray-700 placeholder-gray-400 font-poppins text-sm transition-all sm:p-3.5"
        />
        <button
          aria-label="Send message"
          onClick={handleSendMessage}
          className="p-3 bg-blue-500 text-white rounded-xl hover:shadow-md transition-all sm:p-3.5"
        >
          <FiSend size={20} />
        </button>
      </footer>
    </div>
  );
};

export default EchoooRoom;

const SentChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  createdAt,
  reactions = [],
}) => {
  // const [messageMenuData, setMessageMenuData] = useState({});
  return (
    <div className="flex items-start gap-2 max-w-[90%] animate-fade-in self-end ml-10">
      <div className="flex flex-col gap-1 w-full items-end">
        {/* Header */}
        <div className="flex items-center mr-2 gap-2">
          {createdAt && (
            <span className="text-[8px] text-gray-600/80 font-poppins">
              {formatTime(createdAt)}
            </span>
          )}
          <span className="text-xs text-gray-700 font-medium font-poppins">
            You
          </span>
        </div>

        <div className="w-full flex flex-row gap-1 items-center justify-end ">
          {/* Message Menu Bnt */}
          <div className="relative h-7 w-7 aspect-square flex justify-center items-center hover:bg-neutral-300/50 rounded-full ">
            <HiOutlineDotsVertical size={16} className="text-gray-600 " />
          </div>

          {/* {messageMenuData && <MessageMenu />} */}

          {/* Bubble */}
          <div
            className={`relative bg-blue-100 text-blue-700 rounded-2xl px-4 py-2 shadow-sm hover:shadow transition-all border border-blue-200 font-poppins w-fit  max-w-full ${
              reactions.length > 0 && "min-w-[5rem]"
            }`}
          >
            {/* Message */}
            <p className="text-[13px] whitespace-pre-wrap leading-relaxed break-words">
              {message}
            </p>

            {/* Reactions */}
            <div className="absolute right-4 -bottom-4 border-2 border-white rounded-full flex items-center justify-between mt-1.5">
              {reactions.length > 0 &&
                (() => {
                  const uniqueEmojis = Array.from(new Set(reactions));
                  const duplicateCount = reactions.length - uniqueEmojis.length;

                  return (
                    <div className="flex gap-1 bg-neutral-200 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                      {uniqueEmojis.slice(0, 2).map((emoji, idx) => (
                        <span
                          key={idx}
                          className="text-xs hover:scale-110 active:scale-150 transition-transform"
                        >
                          {emoji}
                        </span>
                      ))}
                      {(uniqueEmojis.length > 2 || duplicateCount > 0) && (
                        <span className="text-[10px] text-gray-600 font-medium">
                          +{uniqueEmojis.length - 2 + duplicateCount}
                        </span>
                      )}
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReceivedChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  userName,
  userImage,
  createdAt,
  reactions = [],
}) => {
  return (
    <div className="flex items-start gap-2 max-w-[90%] animate-fade-in self-start mr-10">
      <img
        src={userImage}
        alt="User avatar"
        className="h-10 w-10 aspect-square rounded-full object-cover border border-white shadow mt-5"
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-2 ">
          <p className="text-xs text-gray-700 font-medium ml-2 font-poppins">
            {userName.split(" ")[0]}
          </p>
          {createdAt && (
            <span className="text-[8px] text-gray-600/80 font-poppins">
              {formatTime(createdAt)}
            </span>
          )}
        </div>
        <div
          className={`relative bg-neutral-100 text-black rounded-2xl px-4 py-2 shadow-sm hover:shadow transition-all border border-neutral-300/10 font-poppins w-fit max-w-full ${
            reactions.length > 0 && "min-w-[5rem]"
          }`}
        >
          <p className="text-[13px] whitespace-pre-wrap leading-relaxed break-words">
            {message}
          </p>
          {/* Reactions */}
          <div className="absolute left-4 -bottom-4 border-2 border-white rounded-full flex items-center justify-between mt-1.5">
            {reactions.length > 0 &&
              (() => {
                const uniqueEmojis = Array.from(new Set(reactions));
                const duplicateCount = reactions.length - uniqueEmojis.length;

                return (
                  <div className="flex gap-1 bg-neutral-200 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                    {uniqueEmojis.slice(0, 2).map((emoji, idx) => (
                      <span
                        key={idx}
                        className="text-xs hover:scale-110 active:scale-150 transition-transform"
                      >
                        {emoji}
                      </span>
                    ))}
                    {(uniqueEmojis.length > 2 || duplicateCount > 0) && (
                      <span className="text-[10px] text-gray-600 font-medium">
                        +{uniqueEmojis.length - 2 + duplicateCount}
                      </span>
                    )}
                  </div>
                );
              })()}
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageMenu: React.FC = () => {
  const [isEmojisOpen, setIsEmojisOpen] = useState<boolean>(false);

  const allEmojis = [
    "👍",
    "❤️",
    "😂",
    "😮",
    "😢",
    "🔥",
    "👏",
    "🎉",
    "😎",
    "💯",
    "🙌",
    "😡",
    "🤔",
    "😭",
    "👀",
    "😳",
    "😴",
    "🤯",
    "🤮",
    "🤡",
    "🤗",
    "🤫",
    "🫠",
    "😤",
  ];

  return (
    <div className="fixed inset-0 z-40 flex flex-col gap-2 items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="flex items-start gap-3 w-64">
        {/* Message Bubble */}
        <div className="bg-white px-4 py-3 backdrop-blur-sm rounded-2xl shadow-md border border-neutral-200 text-xs font-poppins text-black max-w-[80%] max-h-[49px] line-clamp-2 overflow-hidden">
          hello
        </div>
      </div>

      <div className="bg-white backdrop-blur-xs rounded-2xl shadow-lg border border-white/30 w-64 text-sm overflow-hidden transition-all">
        {/* Top Emoji Row */}
        <div className="flex justify-between items-center px-4 py-3 text-xl">
          {allEmojis.slice(0, 6).map((emoji, idx) => (
            <button
              key={idx}
              className="transition-transform hover:scale-125 hover:-rotate-3 duration-200"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={() => setIsEmojisOpen(!isEmojisOpen)}
            className={`text-base ml-1 p-1 text-neutral-500 hover:text-neutral-800 bg-neutral-200/70 hover:bg-neutral-200 rounded-full transition-all duration-200 ${
              isEmojisOpen ? "rotate-[135deg]" : ""
            }`}
            title="More emojis"
          >
            <HiOutlinePlus />
          </button>
        </div>

        {/* Emoji Grid or Action Buttons */}
        {isEmojisOpen ? (
          <div className="grid grid-cols-6 gap-2 p-4 border-t border-neutral-200 text-lg">
            {allEmojis.slice(6).map((emoji, idx) => (
              <button
                key={idx}
                className="transition-transform hover:scale-125 hover:-rotate-3 duration-200"
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col text-neutral-700 border-t border-neutral-200 font-medium">
            <button
              onClick={() => console.log("Reply")}
              className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-100/70 transition active:bg-neutral-200"
            >
              <HiOutlineReply className="text-blue-600 text-lg" />
              Reply
            </button>
            <button
              onClick={() => console.log("Edit")}
              className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-100/70 transition active:bg-neutral-200"
            >
              <HiOutlinePencil className="text-yellow-500 text-lg" />
              Edit Message
            </button>
            <button
              onClick={() => console.log("Delete")}
              className="flex items-center gap-3 px-5 py-3 hover:bg-rose-100/50 active:bg-rose-200 transition text-rose-600"
            >
              <HiOutlineTrash className="text-lg" />
              Delete Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
