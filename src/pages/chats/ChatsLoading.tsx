const ChatsLoading = () => {
  return (
    <div className="flex flex-col gap-3">
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
      ))}
    </div>
  );
};

export default ChatsLoading;