"use client";
import ChatMessage from "@/components/Pages/ChatMessage";
import MessageSendActionInput from "@/components/Pages/MessageSendActionInput";
import { useState, useEffect, useRef } from "react";
import fetchAIResponse from "../src/Utils/fetchAIResponse";
import MessageHeader from "@/components/Pages/MessageHeader";

const HomePage = () => {
  const [messages, setMessages] = useState<{ text: string; isAI: boolean }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { text: message, isAI: false }]);
    setLoading(true);

    try {
      const response = await fetchAIResponse(message);
      setMessages((prev) => [...prev, { text: response, isAI: true }]);
    } catch (error) {
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
  }, [messages, loading]);


  console.log("Message", messages)

  return (
    <div className="bg-white h-[100vh]">
      <MessageHeader/>
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-3 bg-gray-50 h-full p-4">
            <h1 className="text-lg font-semibold">Sidebar Title</h1>
          </div>

          <div className="col-span-9 bg-gray-50 h-full flex flex-col">
            <div className="flex-1 bg-white p-4 overflow-y-auto w-full space-y-1">
              {messages.length === 0 && !loading ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  Start Conversation
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className="bg-white">
              <MessageSendActionInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
