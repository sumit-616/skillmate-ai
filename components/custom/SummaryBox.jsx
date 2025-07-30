import React from "react";
import ReactMarkdown from "react-markdown";

const SummaryBox = ({ summary }) => {
  return (
    <div className="max-h-[60vh] overflow-auto text-base/8">
      <ReactMarkdown>{summary}</ReactMarkdown>
    </div>
  );
};

export default SummaryBox;
