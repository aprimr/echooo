import React from "react";

const MessagesSkeleton: React.FC = () => {
  return (
    <div className="overflow-y-auto pt-20 pb-24 h-[100svh] w-full px-4 space-y-6 bg-gradient-to-b from-white to-gray-50 scrollbar-hidden">
      {Array(8)
        .fill(0)
        .map((_, index) => {
          const isSender = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`flex gap-2 max-w-[90%] animate-pulse ${
                isSender
                  ? "self-end ml-10 items-end justify-end"
                  : "self-start mr-10 items-start"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {!isSender && (
                <div className="h-10 w-10 aspect-square rounded-full bg-neutral-200 animate-pulse mt-5" />
              )}

              <div
                className={`flex flex-col gap-1 w-full ${
                  isSender ? "items-end" : "items-start"
                }`}
              >
                {/* Header */}
                <div
                  className={`flex gap-2 ${
                    isSender ? "justify-end" : "justify-start"
                  } w-full`}
                >
                  <div className="h-3 w-16 rounded bg-neutral-200" />
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 w-fit max-w-full ${
                    isSender ? "bg-neutral-200" : "bg-neutral-200"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="h-3 w-48 bg-neutral-300 rounded" />
                    <div className="h-3 w-36 bg-neutral-300 rounded" />
                  </div>
                </div>
              </div>

              {isSender && (
                <div className="h-10 w-10 aspect-square rounded-full bg-neutral-200 animate-pulse mt-5" />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default MessagesSkeleton;
