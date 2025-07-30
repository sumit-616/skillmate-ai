"use client";
import { Button } from "@components/ui/button";
import { api } from "@convex/_generated/api";
import { CoachingExpert } from "@services/Options";
import { UserButton } from "@stackframe/stack";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AIModel, getToken } from "@services/GlobalServices";
// import { ConvertTextToSpeech } from "@lib/elevenlabs";
import { ConvertTextToSpeech } from "@services/GlobalServices";
import { StreamingTranscriber } from "assemblyai";
import { Loader2Icon } from "lucide-react";
import ChatBox from "@components/custom/ChatBox";
import { toast } from "sonner";
import { UserContext } from "@context/UserContext";
import Webcam from "react-webcam";
const RecordRTC = dynamic(() => import("recordrtc"), { ssr: false });
// import RecordRTC from "recordrtc";

const DiscussionRoom = () => {
  const { roomid } = useParams();
  const { userData, setUserData } = useContext(UserContext);

  const [expert, setExpert] = useState();
  const [enableMic, setEnableMic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribe, setTranscribe] = useState();
  const [conversation, setConversation] = useState([]);
  const [audioUrl, setAudioUrl] = useState();
  const [enableFeedbackNotes, setEnableFeedbackNotes] = useState(false);
  const connectedRef = useRef(false);
  const recorder = useRef(null);
  const streamingTranscriber = useRef(null);
  let silenceTimeout;
  let waitForPause;
  let texts = {};

  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomid,
  });

  const UpdateConversation = useMutation(api.DiscussionRoom.UpdateConversation);
  const updateUserToken = useMutation(api.users.updateUserToken);

  useEffect(() => {
    const Expert = CoachingExpert.find(
      (item) => item.name === DiscussionRoomData?.expertName
    );
    setExpert(Expert);
  }, [DiscussionRoomData]);

  const connectToServer = async () => {
    setLoading(true);
    const token = await getToken();

    // Init assembly ai
    streamingTranscriber.current = new StreamingTranscriber({
      token,
      sampleRate: 16_000,
    });

    streamingTranscriber.current.on("turn", async (turnEvent) => {
      console.log("📝 Transcript received:", turnEvent);
      let msg = "";

      if (turnEvent.end_of_turn) {
        setConversation((prev) => [
          ...prev,
          {
            role: "user",
            content: turnEvent.transcript,
          },
        ]);
        await updateUserTokenMethod(turnEvent.transcript); // User generated token
      }

      texts[turnEvent?.turn_order] = turnEvent?.transcript;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const text = texts[key];
        if (text) {
          msg += text;
          if (i !== keys.length - 1) {
            msg += " ";
          }
        }
      }
      setTranscribe(msg);
    });

    await streamingTranscriber.current
      .connect()
      .then((sessionInfo) => {
        connectedRef.current = true;
        setLoading(false);
        setEnableMic(true);
        toast("Connected successfully");
      })
      .catch((err) => {
        toast("Disconnected successfully");
      });

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const RecordRTC = (await import("recordrtc")).default;
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          recorder.current = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/webm",
            recorderType: RecordRTC.StereoAudioRecorder,
            timeSlice: 250,
            desiredSampRate: 16000,
            numberOfAudioChannels: 1,
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: async (blob) => {
              if (!streamingTranscriber.current || !connectedRef.current)
                return;

              // Reset the silence detection timer on audio input
              clearTimeout(silenceTimeout);
              const buffer = await blob.arrayBuffer();
              streamingTranscriber.current.sendAudio(buffer);

              // Restart the silence detection timer
              silenceTimeout = setTimeout(() => {
                console.log("⏸️ User stopped talking");
              }, 2000);
            },
          });
          console.log("Starting to record...");
          recorder.current.startRecording();
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    clearTimeout(waitForPause);
    async function fetchData() {
      if (
        !DiscussionRoomData ||
        conversation[conversation.length - 1].role === "user"
      ) {
        // Calling AI text Model to Get Response;
        setIsProcessing(true);
        try {
          const lastTwoMsg = conversation.slice(-2);
          const aiResp = await AIModel(
            DiscussionRoomData.topic,
            DiscussionRoomData.coachingOption,
            lastTwoMsg
          );

          const url = await ConvertTextToSpeech(
            aiResp.content,
            DiscussionRoomData.expertName
          );
          // console.log(url);
          setAudioUrl(url);
          setConversation((prev) => [...prev, aiResp]);

          await updateUserTokenMethod(aiResp.content); // AI generated token
        } catch (err) {
          console.error("🛑 AIModel failed:", err.message);
        } finally {
          setIsProcessing(false);
        }
      }
    }
    waitForPause = setTimeout(() => {
      console.log("WAIT...");
      fetchData();
    }, 500);
  }, [conversation]);

  const disconnectFromServer = async (e) => {
    e.preventDefault();
    setLoading(true);
    await streamingTranscriber.current.close();
    recorder.current.pauseRecording();
    recorder.current = null;
    connectedRef.current = false;
    setEnableMic(false);
    await UpdateConversation({
      id: DiscussionRoomData._id,
      conversation: conversation,
    });
    setLoading(false);
    setEnableFeedbackNotes(true);
  };

  const updateUserTokenMethod = async (text) => {
    const tokenCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const result = await updateUserToken({
      id: userData?._id,
      credits: Number(userData.credits) - Number(tokenCount),
    });

    setUserData((prev) => ({
      ...prev,
      credits: Number(userData.credits) - Number(tokenCount),
    }));
  };

  return (
    <div className="-mt-12">
      <h2 className="text-lg font-bold">
        {DiscussionRoomData?.coachingOption}
      </h2>
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-8 gap-10">
        <div className="xl:col-span-5">
          <div className="h-[60vh] bg-secondary border rounded-3xl flex flex-col items-center justify-center relative">
            {/* <UserButton /> */}
            <Webcam className="w-full h-full object-cover rounded-3xl" />
            <div className="flex flex-col items-center justify-center py-2 bg-gray-200 px-10 rounded-lg absolute bottom-3 right-3">
              {expert?.avatar && (
                <Image
                  src={expert?.avatar}
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="h-[60px] w-[60px] rounded-full object-cover animate-pulse"
                />
              )}
              <h2 className="text-gray-500">{expert?.name}</h2>
              <audio src={audioUrl} type="audio/mp3" autoPlay />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            {!enableMic ? (
              <Button
                className="cursor-pointer"
                onClick={connectToServer}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2Icon className="animate-spin" />
                    Connecting
                  </span>
                ) : (
                  "Connect"
                )}
              </Button>
            ) : (
              <Button
                className="cursor-pointer"
                variant={"destructive"}
                onClick={disconnectFromServer}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2Icon className="animate-spin" />
                    Disconnecting
                  </span>
                ) : (
                  "Disconnect"
                )}
              </Button>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <ChatBox
            conversation={conversation}
            enableFeedbackNotes={enableFeedbackNotes}
            coachingOption={DiscussionRoomData?.coachingOption}
          />
        </div>
      </div>
      <div>
        <h2>{transcribe}</h2>
      </div>
    </div>
  );
};

export default DiscussionRoom;
