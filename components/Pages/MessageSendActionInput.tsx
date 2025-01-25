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
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message.trim()) {
      handleMessageSend();
    }
  };

  return (
    <div className="px-4 pb-4 bg-white dark:bg-slate-800  rounded-b-xl">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} 
          className="flex-1 py-4 px-4 bg-[#F5F7FB] dark:bg-slate-800 dark:border dark:border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#39A68A]"
        />
        <button
          onClick={handleMessageSend}
          disabled={!message.trim()}
          className="h-14 w-14 bg-[#39A68A] rounded-full text-white flex justify-center items-center focus:outline-none  focus:ring-[#39A68A]"
          aria-label="Type a message..."
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageSendActionInput;
