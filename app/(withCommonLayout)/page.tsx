"use client";
import ChatMessage from "@/components/Pages/ChatMessage";
import MessageSendActionInput from "@/components/Pages/MessageSendActionInput";
import { useState, useEffect, useRef } from "react";
import fetchAIResponse from "../src/Utils/fetchAIResponse";
import { Sun } from "lucide-react";
import MessageSidebar from "@/components/Pages/MessageSidebar";
import { useChat } from "@/components/CommonFile/ChatContext";
import MessageHeader from "@/components/Pages/MessageHeader";

const HomePage = () => {
  const { messages, addMessage, isSidebarOpen } = useChat();
  const [message, setMessages] = useState<{ text: string; isAI: boolean }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isAI: false,
      },
    ]);
    setLoading(true);
    addMessage({ text: message, isAI: false });

    try {
      const response = await fetchAIResponse(message);
      setMessages((prev) => [...prev, { text: response, isAI: true }]);
      addMessage({ text: response, isAI: true });
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to fetch response.", isAI: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, loading]);

  console.log("AI message responsive", message);

  return (
    <div className="bg-[#F5F7FB] dark:bg-slate-900 h-[100vh] ">
      <div className="container mx-auto ">
        <div className="grid grid-cols-12 h-full p-0 md:p-5 gap-4 ">
          {/* <div className=" col-span-12 md:col-span-3 rounded-xl space-y-4 h-[81vh]  pt-4"> */}
          <div
            className={`fixed top-0 left-0 h-[100vh] md:h-[81vh]   transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:translate-x-0 md:col-span-3 rounded-xl space-y-4 pt-4`}
          >
            <MessageSidebar />
          </div>

          <div className=" col-span-12 md:col-span-9 h-[100vh] md:h-[90vh] flex flex-col  rounded-b-xl p-4  ">
            <div className=" w-full flex justify-end">
              <MessageHeader/>
            </div>
            <div className="flex-1 bg-white dark:bg-slate-800 p-4 overflow-y-auto h-full scrollbar-hide w-full space-y-1 rounded-t-xl">
              {messages.length === 0 && !loading ? (
                <div className="flex justify-center items-center h-full text-gray-500 dark:text-white">
                  Start Conversation
                </div>
              ) : (
                <div className=" h-full">
                  {messages.map((msg, index) => (
                    <ChatMessage
                      key={index}
                      message={msg.text}
                      isAI={msg.isAI}
                    />
                  ))}
                  {loading && (
                    <section className="dots-container flex items-center gap-1">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </section>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}
            </div>
            <div className="">
              <MessageSendActionInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
