"use client"
import { Search } from "lucide-react";
import { useChat } from "../CommonFile/ChatContext";
import { useState } from "react";

const MessageSidebar = () => {
  const { messages } = useChat();
  const [searchTerm, setSearchTerm] = useState("");

  const userMessages = messages
    .filter((message) => !message.isAI && message.text.toLowerCase().includes(searchTerm.toLowerCase()))
    .reverse();

  return (
    <div className=" h-full space-y-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none text-slate-700 dark:text-white">
          <Search />
        </div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-14 pr-4  py-3 text-gray-900 bg-white dark:bg-slate-800 dark:text-white   rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="text-lg font-semibold h-full bg-white dark:bg-slate-800  text-slate-600  dark:text-white rounded-xl p-4 overflow-y-auto">
       { userMessages.length > 0 &&  <h1 className="text-center mb-4">User Messages</h1>}
        <ul className="space-y-2">
          {userMessages.length === 0 ? (
            <li className="text-center text-gray-500 dark:text-white">No user messages</li>
          ) : (
            userMessages.map((msg, index) => (
              <li
                key={index}
                className="px-3 py-1.5 border-b border-gray-200 dark:border-white/20 dark:text-white text-gray-600 hover:text-[#39A68A] cursor-pointer"
              >
                {msg.text}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MessageSidebar;
