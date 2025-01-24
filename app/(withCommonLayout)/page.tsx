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
  const { messages, addMessage, clearMessages } = useChat();
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
      <div className="container mx-auto">
        <div className="grid grid-cols-12 h-full p-5 gap-4 ">
          <div className="col-span-3 rounded-xl space-y-4 h-[81vh]  pt-4">
            <MessageSidebar />
          </div>

          <div className="col-span-9 h-[90vh] flex flex-col  rounded-b-xl p-4  ">
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
