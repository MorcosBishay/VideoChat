import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = process.env.REACT_APP_AGORA_APP_ID;
const token = process.env.REACT_APP_AGORA_TOKEN;

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "Nodogoro";
