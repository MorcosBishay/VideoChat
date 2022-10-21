import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

let token = null;
await fetch(
  "https://video-chat-nodogoro.herokuapp.com/rtc/Nodogoro/1/uid/0/?expiry=300"
)
  .then((response) => response.json())
  .then((data) => {
    token = data.rtcToken;
  });

const appId = process.env.REACT_APP_AGORA_APP_ID;
// const token = process.env.REACT_APP_AGORA_TOKEN;

export const config = await {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
  token: token,
};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "Nodogoro";
