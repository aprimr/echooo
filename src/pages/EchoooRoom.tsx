import { DocumentData } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiInfo, FiSend, FiX } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight, HiOutlineTrash } from "react-icons/hi2";
import { TiWarning } from "react-icons/ti";
import { auth } from "../firebase/config";
import {
  deleteMessage,
  getAllUsers,
  getMessages,
  sendMessage,
} from "../lib/echoooRoom";
import MessagesSkeleton from "./chats/MessagesSkeleton";
import {
  HiOutlineDotsVertical,
  HiOutlinePencilAlt,
  HiOutlineReply,
} from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { PiHandPeace } from "react-icons/pi";

interface ChatBubbleProps {
  messgaeId?: string;
  message: string;
  userName: string;
  userImage?: string;
  deletedAt: string;
  createdAt: { seconds: number; nanoseconds: number };
  reactions?: string[];
}

interface MessageMenuProps {
  closeMenu: () => void;
  messageId: string | number;
  messageText: string;
}

export interface UserDetails {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  friends: string[];
}

const formatTime = (timestamp: { seconds: number; nanoseconds: number }) => {
  if (!timestamp) return "";
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const EchoooRoom = () => {
  const [showRules, setShowRules] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState<UserDetails[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const prevMessagesLengthRef = useRef<number>(0);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const unsubscribe = getMessages((msgs) => setMessages(msgs));
    return () => unsubscribe();
  }, []);

  // Scroll to bottom on initial mount
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    prevMessagesLengthRef.current = messages.length;
  }, []);

  // Scroll only when a new message is added
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevMessagesLengthRef.current = messages.length;
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

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };

    fetchUsers();
  }, []);

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
            onClick={() => setShowInfo((prev) => !prev)}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-colors"
          >
            {!showInfo ? (
              <FiInfo size={20} />
            ) : (
              <AiOutlineCloseCircle size={20} />
            )}
          </button>
        </div>
      </header>

      {/* Rules ribbon */}
      {showRules && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-md z-30 mx-auto flex items-center gap-1 shadow-sm bg-rose-500 text-white px-5 py-2">
          <TiWarning size={15} className="flex-shrink-0" />
          <div className="flex flex-row gap-1 items-center text-xs font-medium font-poppins truncate">
            No spam • Stay respectful • Keep your info safe
            <PiHandPeace size={15} />
          </div>
        </div>
      )}

      {/* Info screen */}
      {showInfo && (
        <div className="fixed inset-0  flex items-start justify-center z-40 bg-transparent overflow-y-auto">
          {/* Modal Container */}
          <div className="w-full max-w-md bg-white border-x border-gray-300 flex flex-col h-[100svh] shadow-lg">
            {/* Header */}
            <div className="flex items-center w-full px-5 py-3 border-b border-gray-300 bg-white shadow sticky top-0 z-50">
              <div className="flex items-center gap-1 min-w-0">
                <button
                  aria-label="Go back"
                  onClick={() => setShowInfo(false)}
                  className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100/80 transition-all"
                >
                  <FiChevronLeft size={22} />
                </button>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-base font-semibold text-gray-800 truncate max-w-[150px] font-nunito">
                    Echooo Room
                  </h1>
                  <p className="text-xs text-blue-400 font-poppins font-medium gap-1">
                    Info
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col gap-2 items-center py-5 bg-gradient-to-b from-blue-200 via-blue-100 to-white">
              <div className="h-20 w-20 flex justify-center items-center rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
                <HiOutlineChatBubbleLeftRight size={35} />
              </div>
              <p className="text-lg font-semibold text-gray-800 mt-1">
                Echooo Room
              </p>
            </div>

            {/* Members Section */}
            <div className="flex-1 px-4 py-2 overflow-y-auto bg-white">
              <div className="sticky -top-4 bg-white z-30 py-2 flex items-center justify-between border-b border-gray-200">
                <h2 className="flex items-center gap-2 text-base font-semibold text-gray-700">
                  <FaRegUser className="text-blue-500" /> Members
                </h2>
                <span className="text-sm text-blue-500">{allUsers.length}</span>
              </div>

              <ul className="space-y-2 mt-2">
                {allUsers.map((user, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
                  >
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {user.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {messages.length === 0 ? (
        <MessagesSkeleton />
      ) : (
        <main className="overflow-y-auto pt-20 pb-18 h-[100svh] w-full px-4 space-y-5 scrollbar-hidden bg-gradient-to-b from-white via-blue-50/50 to-blue-50/60">
          {messages.map((msg) =>
            isSender(msg.userId) ? (
              <SentChatBubble
                key={msg.id}
                messgaeId={msg.id}
                message={msg.message}
                userName={msg.userName}
                deletedAt={msg.deletedAt}
                createdAt={msg.createdAt}
                reactions={msg.reactions}
              />
            ) : (
              <ReceivedChatBubble
                key={msg.id}
                message={msg.message}
                userName={msg.userName}
                userImage={msg.userImage}
                deletedAt={msg.deletedAt}
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
  messgaeId,
  deletedAt,
  createdAt,
  reactions = [],
}) => {
  const [messageMenuId, setMessageMenuId] = useState<string>("");
  const [messageMenuText, setMessageMenuText] = useState<string>("");

  const handleCloseMenu = () => {
    setMessageMenuId("");
    setMessageMenuText("");
  };
  return (
    <div className="flex items-start gap-2 max-w-[90%] animate-fade-in self-end ml-10">
      <div className="flex flex-col gap-1 w-full items-end">
        {/* Header */}
        <div className="flex items-center mr-2 gap-1">
          {createdAt && (
            <span className="text-[9px] text-gray-600/90 font-poppins">
              {formatTime(createdAt)}
            </span>
          )}
          <span className="text-xs text-gray-700 font-medium font-poppins">
            • You
          </span>
        </div>

        <div className="w-full flex flex-row gap-1 items-center justify-end ">
          {/* Message Menu Bnt */}
          {deletedAt === null && (
            <div
              onClick={() => (
                setMessageMenuId(messgaeId as string),
                setMessageMenuText(message)
              )}
              className="relative h-7 w-7 aspect-square flex justify-center items-center hover:bg-neutral-300/50 rounded-full "
            >
              <HiOutlineDotsVertical size={16} className="text-gray-600 " />
            </div>
          )}

          {messageMenuId && messageMenuText && (
            <MessageMenu
              closeMenu={handleCloseMenu}
              messageId={messageMenuId}
              messageText={messageMenuText}
            />
          )}

          {/* Bubble */}
          {deletedAt !== null ? (
            // Deleted message
            <div className={`w-full flex justify-end items-start mb-3`}>
              <div className="relative text-sm bg-gray-200 text-gray-900 border border-gray-300 italic rounded-2xl px-4 py-1.5 shadow-sm  font-nunito w-fit max-w-full">
                Deleted a message
              </div>
            </div>
          ) : (
            <div
              className={`relative bg-blue-500 text-white rounded-2xl px-4 py-2 shadow-sm hover:shadow transition-all border border-blue-600 font-poppins w-fit  max-w-full ${
                reactions.length > 0 && "min-w-[5rem]"
              }`}
            >
              {/* Message */}
              <p className="text-[13px] whitespace-pre-wrap leading-relaxed break-words">
                {message}
              </p>

              {/* Reactions */}
              {/* <div className="absolute right-4 -bottom-4 border-2 border-white rounded-full flex items-center justify-between mt-1.5">
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
            </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReceivedChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  userName,
  userImage,
  deletedAt,
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
        {/* name & time */}
        <div className="flex items-center gap-1 ">
          <p className="text-xs text-gray-700 font-medium ml-2 font-poppins">
            {userName.split(" ")[0]} •
          </p>
          {createdAt && (
            <span className="text-[9px] text-gray-600/90 font-poppins">
              {formatTime(createdAt)}
            </span>
          )}
        </div>

        {/* Chat bubble */}
        {deletedAt !== null ? (
          // deleted message
          <div className={`w-full flex items-start mb-3`}>
            <div className="relative text-sm bg-gray-200 text-gray-900 border border-gray-300 italic rounded-2xl px-4 py-1.5 shadow-sm font-nunito w-fit max-w-full">
              Deleted a message
            </div>
          </div>
        ) : (
          <div
            className={`relative bg-blue-100 text-blue-900 rounded-2xl px-4 py-2 shadow-sm hover:shadow transition-all border border-blue-600/30 font-poppins w-fit max-w-full ${
              reactions.length > 0 && "min-w-[5rem]"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">
              {message}
            </p>
            {/* Reactions */}
            {/* <div className="absolute left-4 -bottom-4 border-2 border-white rounded-full flex items-center justify-between mt-1.5">
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
          </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

const MessageMenu: React.FC<MessageMenuProps> = ({
  closeMenu,
  messageId,
  messageText,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDeleteMessage = async (messageId: string | number) => {
    if (!messageId) return;
    setIsDeleting(true);
    try {
      await deleteMessage(messageId.toString());
      setIsDeleting(false);
      closeMenu();
    } catch (error) {
      console.log("Delete error:", error);
      setError("Error deleting message");
      setIsDeleting(false);
    }
  };

  return (
    <div
      onClick={closeMenu}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-t-2xl shadow-lg py-3 px-4 font-poppins animate-slide-up"
      >
        {/* Handle */}
        <div onClick={closeMenu} className="w-full flex justify-center mb-3">
          <div className="h-1 w-14 bg-neutral-300 rounded-full" />
        </div>

        {/* Message preview bubble */}
        <div className="flex items-start justify-end w-full mb-3">
          <div className="bg-blue-100 text-blue-700 shadow-xs border border-blue-200 backdrop-blur-md rounded-xl rounded-br-none px-3 py-1 text-sm break-words w-fit max-w-xs max-h-[55px] line-clamp-2">
            {messageText}
          </div>
        </div>

        {error && (
          <div className="w-full bg-rose-500 text-white rounded-md px-2 text-sm mb-2">
            {error}
          </div>
        )}

        {/* Bottom Menu */}
        <div className="flex flex-col text-neutral-700 bg-neutral-200/10 rounded-xl shadow-sm border border-neutral-300 font-medium text-sm">
          <button
            onClick={() => console.log("Edit")}
            className="flex items-center gap-2.5 px-4 py-3 hover:bg-emerald-100/40 active:bg-emerald-200 bg-gray-200 transition text-emerald-600 rounded-t-xl"
          >
            <HiOutlinePencilAlt className="text-base" />
            Edit Message (disabled)
          </button>

          <button
            onClick={() => console.log("Reply")}
            className="flex items-center gap-2.5 px-4 py-3 hover:bg-blue-100/40 active:bg-blue-200 bg-gray-200 transition text-blue-600"
          >
            <HiOutlineReply className="text-base" />
            Reply (disabled)
          </button>

          <button
            onClick={() => handleDeleteMessage(String(messageId))}
            disabled={isDeleting}
            className="flex items-center gap-2.5 px-4 py-3 hover:bg-rose-100/40 active:bg-rose-200 transition text-rose-600 disabled:text-neutral-500"
          >
            {!isDeleting ? (
              <HiOutlineTrash className="text-base" />
            ) : (
              <VscLoading className="text-base animate-spin" />
            )}
            {!isDeleting ? "Delete message" : "Deleting"}
          </button>

          <button
            onClick={closeMenu}
            className="flex items-center gap-2.5 px-4 py-3 hover:bg-neutral-100 active:bg-neutral-200 transition text-neutral-600 border-t border-neutral-200 rounded-b-xl"
          >
            <FiX className="text-base" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
