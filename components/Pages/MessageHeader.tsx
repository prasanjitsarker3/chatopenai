"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useChat } from "../CommonFile/ChatContext";

const MessageHeader = () => {
  const { theme, setTheme } = useTheme();
  const { clearMessages } = useChat();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleClearMessage = () => {
    clearMessages();
  };
  return (
    <div className=" flex items-center gap-6 mb-4">
      <button
        onClick={handleClearMessage}
        className=" py-3 px-8 bg-white dark:text-white dark:bg-slate-800 rounded-full "
      >
        Clear
      </button>
      <div
        onClick={handleThemeToggle}
        className="h-12 w-12 rounded-full bg-white dark:bg-slate-800 flex justify-center items-center cursor-pointer"
      >
        {theme === "dark" ? (
          <Moon className="h-6 w-6 text-gray-800 dark:text-white" />
        ) : (
          <Sun className="h-6 w-6 text-yellow-500" />
        )}
      </div>
    </div>
  );
};

export default MessageHeader;
