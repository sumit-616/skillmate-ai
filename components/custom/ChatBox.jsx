import React, { useState } from "react";
import MarkdownRenderer from "@/components/custom/MarkdownRenderer";
import { Button } from "@components/ui/button";
import { AIModelToGenerateFeedbackAndNotes } from "@services/GlobalServices";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@convex/_generated/api";
import { toast } from "sonner";

const ChatBox = ({ conversation, enableFeedbackNotes, coachingOption }) => {
  const [loading, setLoading] = useState(false);

  const updateSummary = useMutation(api.DiscussionRoom.UpdateSummary);

  const { roomid } = useParams();

  const GenerateFeedbackNotes = async () => {
    setLoading(true);
    try {
      const result = await AIModelToGenerateFeedbackAndNotes(
        coachingOption,
        conversation
      );
      // console.log(result.content);
      await updateSummary({
        id: roomid,
        summary: result.content,
      });
      setLoading(false);
      toast("Feedback/Notes saved successfully.");
    } catch (e) {
      setLoading(false);
      toast("Internal server error, Try again.");
    }
  };

  return (
    <div>
      <div className="h-[60vh] bg-secondary border rounded-2xl flex flex-col relative p-4 overflow-auto">
        {conversation.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.role === "user" && "justify-end"}`}
          >
            {item.role === "assistant" ? (
              <h2 className="p-0.5 px-2 bg-primary mt-2 text-white inline-block rounded-b-md rounded-tr-md max-w-[70%]">
                <MarkdownRenderer content={item.content} />
              </h2>
            ) : (
              <h2 className="p-0.5 px-2 bg-gray-200 mt-2 inline-block rounded-b-md rounded-tl-md max-w-[70%]">
                <MarkdownRenderer content={item.content} />
              </h2>
            )}
          </div>
        ))}
      </div>
      {enableFeedbackNotes && (
        <Button
          onClick={GenerateFeedbackNotes}
          disabled={loading}
          className="mt-5 w-full cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2Icon className="animate-spin" />
              Generating
            </span>
          ) : (
            "Generate Feedback/Notes"
          )}
        </Button>
      )}
    </div>
  );
};

export default ChatBox;
