"use client";
import { useParams } from "next/navigation";
import React from "react";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { CoachingOptions } from "@services/Options";
import moment from "moment/moment";
import ChatBox from "@components/custom/ChatBox";
import SummaryBox from "@components/custom/SummaryBox";

const ViewSummary = () => {
  const { roomid } = useParams();

  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });

  const GetAbstractImages = (option) => {
    const coachingOption = CoachingOptions.find((item) => item.name === option);
    return coachingOption?.abstract ?? "/ab1.png";
  };

  return (
    <div className="-mt-10">
      <div className="flex justify-between items-end">
        <div className="flex gap-7 items-center">
          <Image
            src={GetAbstractImages(DiscussionRoomData?.coachingOption)}
            alt="abstract"
            width={100}
            height={200}
            className="w-[70px] h-[70px] rounded-full"
          />
          <div>
            <h2 className="font-bold text-lg">{DiscussionRoomData?.topic}</h2>
            <h2 className="text-gray-400">
              {DiscussionRoomData?.coachingOption}
            </h2>
          </div>
        </div>
        <h2 className="text-gray-400">
          {moment(DiscussionRoomData?._creationTime).fromNow()}
        </h2>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 mt-5">
        <div className="col-span-3">
        <h2 className="text-xl font-bold mb-3">Summary of your Conversation</h2>
          <SummaryBox summary = {DiscussionRoomData?.summary}/>
        </div>
        <div className="col-span-2">
        <h2 className="text-xl font-bold mb-3">Your Conversation</h2>
          {DiscussionRoomData?.conversation && (
            <ChatBox
              conversation={DiscussionRoomData?.conversation}
              coachingOption={DiscussionRoomData?.coachingOption}
              enableFeedbackNotes={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSummary;
