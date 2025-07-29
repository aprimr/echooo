const Chats: React.FC = () => {
  return (
    <div className="min-h-[100svh] w-full flex flex-col gap-4 px-5 py-4">
      <UsersOnline />
      <ChatList />
    </div>
  );
};

export default Chats;

const UsersOnline = () => {
  return (
    <div className="h-auto w-full flex items-center gap-4 py-2 overflow-x-auto scrollbar-hidden rounded">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center gap-1">
          <div className="min-h-12 min-w-12 bg-neutral-200 rounded-full animate-pulse" />
          <div className="text-sm h-3 w-16 bg-neutral-200 font-semibold rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};

const ChatList = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
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
      ))}
    </div>
  );
};
