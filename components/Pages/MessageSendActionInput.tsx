"use client";
import { Send } from "lucide-react";
import { useState } from "react";
type MessageProps = {
  onSendMessage: (message: string) => void;
};

const MessageSendActionInput = ({ onSendMessage }: MessageProps) => {
  const [message, setMessage] = useState<string>("");

  const handleMessageSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleMessageSend();
    }
  };

  return (
    <div className="p-4 ">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          onChange={(e) => setMessage(e.target.value)}
          // onKeyDown={handleKeyDown}
          className="flex-1 py-4 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleMessageSend}
          disabled={!message.trim()}
          className="h-14 w-14 bg-blue-600 text-white flex justify-center items-center rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageSendActionInput;
