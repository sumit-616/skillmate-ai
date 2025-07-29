import axios from "axios";

const voiceMap = {
  salli: "EXAVITQu4vr4xnSDxMaL",   // Voice ID for Salli
  joey: "21m00Tcm4TlvDq8ikWAM",    // Voice ID for Joey
  joanna: "TxGEqnHWrfWFTfGW9XjX",  // Voice ID for Joanna
};

export const ConvertTextToSpeech = async (text, voice) => {
  const voiceId = voiceMap[voice.toLowerCase()];
  if (!voiceId) throw new Error("Invalid voice name provided.");

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    },
    {
      headers: {
        "xi-api-key": process.env.NEXT_PUBLIC_ELEVEN_LABS,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    }
  );

  const blob = new Blob([response.data], { type: "audio/mpeg" });
  const audioUrl = URL.createObjectURL(blob);
  return audioUrl;
};
