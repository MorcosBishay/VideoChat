import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "../config/settings";
import Controls from "./Controls";
import Videos from "./Videos";
import { db } from "../config/Firebase";
import { update, ref, set } from "firebase/database";
import { Typography } from "@mui/material";

const VideoCall = ({
  handleInCall,
  users,
  handleUsers,
  userName,
  handleSignOut,
}) => {
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myCamera, setMyCamera] = useState(true);

  const [usersInCall, setUsersInCall] = useState([]);

  const handleStart = (state) => setStart(state);

  useEffect(async () => {
    if (client._uid != undefined) {
      await update(ref(db, "users"), {
        [client._uid]: userName,
      });
      await set(ref(db, "usersCount"), users.length);
    }
  }, [client, users]);

  useEffect(async () => {
    let init = async (name) => {
      client.on("user-joined", (user) => {
        setUsersInCall((arr) => [...arr, user]);
      });

      // User Publishes
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          await handleUsers((users) => [...users, user]);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
          await handleUsers((prev) => {
            return prev.map((ussr) => (ussr.uid == user.uid ? user : ussr));
          });
        }
      });

      // User Unpublished
      client.on("user-unpublished", async (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack?.stop();
          if (user.videoTrack)
            await handleUsers((prev) => {
              return prev.map((ussr) => (ussr.uid == user.uid ? user : ussr));
            });
        }
        if (mediaType === "video") {
          handleUsers((users) => users.filter((u) => u.uid !== user.uid));
        }
      });

      // User Left
      client.on("user-left", (user) => {
        handleUsers((users) => users.filter((u) => u.uid !== user.uid));
        setUsersInCall((arr) => arr.filter((u) => u.uid !== user.uid));
      });

      // Join Channel
      try {
        await client.join(config.appId, name, config.token, null);
      } catch (err) {
        console.log(err);
      }

      // Publish Tracks
      if (tracks) await client.publish([tracks[0], tracks[1]]);

      // Set Start
      setStart(true);
      setIsLoading(false);
    };

    // Initialize
    if (ready && tracks) {
      try {
        init(channelName);
      } catch (err) {
        console.log(err);
      }
    }
  }, [channelName, client, ready, tracks]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Grid container direction="column" sx={{ height: "100%" }}>
      <Grid item sx={{ height: "5%" }} xs={2}>
        {ready && tracks && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{
              backgroundColor: "#FBBF77",
            }}
          >
            <Grid item>
              <Typography variant="h6" align="center">
                Meeting Controls
              </Typography>
            </Grid>
            <Grid item>
              <Controls
                tracks={tracks}
                handleStart={handleStart}
                handleInCall={handleInCall}
                setMyCamera={setMyCamera}
                handleSignOut={handleSignOut}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item sx={{ height: "95%" }} xs={10}>
        {start && tracks && (
          <Videos
            tracks={tracks}
            users={users}
            userName={userName}
            usersInCall={usersInCall}
            myCamera={myCamera}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default VideoCall;

VideoCall.propTypes = {
  handleInCall: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  handleUsers: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};
