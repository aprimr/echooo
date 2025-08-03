import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const ChatsList = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="text-xl font-medium font-nunito">Your Chats</div>

      {/* Public Echooo Room */}
      <div className="flex items-center gap-4 p-3 rounded-md bg-neutral-100 hover:bg-blue-100/30 transition-colors duration-200 cursor-pointer">
        <div className="h-12 w-auto aspect-square flex justify-center items-center rounded-full bg-gradient-to-br from-blue-600/90 via-blue-500/90 to-blue-400/80 text-white shadow">
          <HiOutlineChatBubbleLeftRight size={24} />
        </div>

        {/* Chat Details */}
        <div
          onClick={() => {
            navigate("echoooroom");
          }}
          className="flex flex-col flex-grow gap-0.5 min-w-0"
        >
          <div className="w-full items-center flex justify-between">
            <h2 className="text-base font-semibold text-gray-800 truncate font-nunito">
              Echooo Room
            </h2>
            <div className="w-auto flex flex-row gap-1 items-center ">
              <p className="text-[11px] text-neutral-600 font-inter font-semibold pt-[1px]">
                2
              </p>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>

          <p className="text-sm text-gray-500 truncate font-nunito">
            Chat with everyone in the public Echooo Room.
          </p>
        </div>
      </div>

      {/*       
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          style={{ animationDelay: `${index * 100}ms` }}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-100/30 transition cursor-pointer"
        >
          <div className="h-12 w-12 bg-neutral-200 text-white font-bold rounded-full animate-pulse" />

          <div className="flex flex-col flex-grow gap-1">
            <h2 className="h-4 w-[40%] bg-neutral-200 rounded animate-pulse" />
            <p className="h-3 w-[80%] bg-neutral-100 rounded animate-pulse" />
          </div>

          <div className="h-full w-auto flex flex-col items-end gap-2">
            <span className="h-3 w-8 bg-neutral-200 rounded animate-pulse" />
            <span className="h-4 w-4 bg-neutral-200 rounded-full animate-pulse" />
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default ChatsList;
