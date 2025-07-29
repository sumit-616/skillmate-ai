import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy } from "react-icons/fi";

const cleanContent = (content) => {
  let cleaned = content.replace(/\(Response:\s*\d+\s*chars\)/gi, "").trim();

  const followUpMatch = cleaned.match(/Follow-up:\s*(.+)/i);
  let followUpText = "";

  if (followUpMatch) {
    followUpText = followUpMatch[1].trim();
    cleaned = cleaned.replace(followUpMatch[0], "").trim(); 
  }

  return {
    main: cleaned,
    followUp: followUpText,
  };
};

const MarkdownRenderer = ({ content }) => {
  const { main, followUp } = cleanContent(content);

  return (
    <div className="space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeText = String(children).replace(/\n$/, "");

            const [copied, setCopied] = useState(false);

            const handleCopy = async () => {
              try {
                await navigator.clipboard.writeText(codeText);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              } catch (err) {
                console.error("Copy failed:", err);
              }
            };

            return !inline && match ? (
              <div className="relative rounded-lg overflow-hidden group">
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 z-10 bg-gray-700 text-white p-2 rounded-md opacity-70 hover:opacity-100 transition cursor-pointer"
                  title="Copy"
                >
                  <FiCopy />
                </button>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  customStyle={{
                    padding: "32px 16px 16px 16px",
                    marginTop: "4px",
                    marginRight: "2px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    backgroundColor: "#1e1e1e",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    WebkitFontSmoothing: "auto",
                    MozOsxFontSmoothing: "auto",
                    textShadow: "none",
                    fontFamily: "Consolas, 'Fira Code', monospace",
                  }}
                  {...props}
                >
                  {codeText}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className={`bg-gray-300 text-black px-1 rounded text-sm ${
                  inline ? "" : "block overflow-x-auto whitespace-pre font-mono"
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {main}
      </ReactMarkdown>

      {followUp && (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {followUp}
        </ReactMarkdown>
      )}
    </div>
  );
};

export default MarkdownRenderer;
