import ChatsList from "./ChatsList";

const Chats: React.FC = () => {
  return (
    <div className="min-h-[80svh] w-full flex flex-col gap-4 px-5 py-4">
      <ChatsList />
    </div>
  );
};

export default Chats;
