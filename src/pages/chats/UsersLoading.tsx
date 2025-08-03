const UsersLoading = () => {
  return (
    <div className="h-auto w-full flex items-center gap-4 py-2 overflow-x-auto scrollbar-hidden rounded">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          style={{ animationDelay: `${index * 100}ms` }}
          className="flex flex-col items-center gap-1"
        >
          <div className="min-h-12 min-w-12 bg-neutral-200 rounded-full animate-pulse" />
          <div className="text-sm h-3 w-16 bg-neutral-200 font-semibold rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default UsersLoading;