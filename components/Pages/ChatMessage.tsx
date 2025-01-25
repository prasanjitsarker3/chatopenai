import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

type Props = {
  message: string;
  isAI: boolean;
};

const ChatMessage = ({ message, isAI }: Props) => (
  <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-6`}>
    <div className={`flex max-w-[70%] ${isAI ? "items-start" : "items-end"}`}>
      <div
        className={` px-2 py-2 xl:px-4 xl:py-3 rounded-2xl ${
          isAI ? "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white" : "bg-blue-600 dark:bg-slate-700 text-white dark:text-[#39A68A]"
        }`}
      >
        <ReactMarkdown
          className="markdown-content pb-2"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code({ inline, children, className, ...props }: any) {
              return inline ? (
                <code className="bg-gray-200 px-1 py-0.5 rounded text-xs lg:text-sm">
                  {children}
                </code>
              ) : (
                <pre className="bg-gray-800 text-white p-3 rounded-md overflow-x-auto text-xs lg:text-sm">
                  <code {...props}>{children}</code>
                </pre>
              );
            },
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  </div>
);

export default ChatMessage;
