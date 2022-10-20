import React, { useState } from "react";
import PropTypes from "prop-types";
import { useClient } from "../config/settings";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton ";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";

const Controls = ({ tracks, handleStart, handleInCall, setMyCamera }) => {
  const client = useClient();
  const [trackState, setTrackState] = useState({
    video: true,
    audio: true,
  });

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    handleStart(false);
    handleInCall(false);
  };

  const toggleMute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => ({
        ...ps,
        audio: !ps.audio,
      }));
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setMyCamera((ps) => !ps);
      setTrackState((ps) => ({
        ...ps,
        video: !ps.video,
      }));
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      direction="row"
    >
      <Grid item>
        <IconButton
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => toggleMute("audio")}
        >
          {trackState.audio ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => toggleMute("video")}
        >
          {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          sx={{
            color: "red",
          }}
          onClick={() => leaveChannel()}
        >
          <CallEndIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Controls;

Controls.propTypes = {
  tracks: PropTypes.array.isRequired,
  handleInCall: PropTypes.func.isRequired,
  handleStart: PropTypes.func.isRequired,
  setMyCamera: PropTypes.func.isRequired,
};
