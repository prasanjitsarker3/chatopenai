
type Props = {
  message: string;
  isAI: boolean;
};

const ChatMessage = ({ message, isAI }: Props) => (
  <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}>
    <div className={`flex max-w-[70%] ${isAI ? "items-start" : "items-end"}`}>
      <div
        className={`px-4 py-2 rounded-2xl ${
          isAI ? "bg-gray-100 text-gray-900" : "bg-blue-600 text-white"
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  </div>
);

export default ChatMessage;
