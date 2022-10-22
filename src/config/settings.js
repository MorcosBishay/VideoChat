import {
  createClient,
  createMicrophoneAndCameraTracks,
} from 'custom-agora-rtc-react'

let token = null

await fetch(
  'https://video-chat-nodogoro.herokuapp.com/rtc/Nodogoro/1/uid/0/?expiry=1000000000',
)
  .then((response) => response.json())
  .then((data) => {
    token = data.rtcToken
  })

const appId = process.env.REACT_APP_AGORA_APP_ID

export const config = await {
  mode: 'rtc',
  codec: 'vp8',
  appId: appId,
  token: token,
}
export const useClient = createClient(config)
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks()
export const channelName = 'Nodogoro'
