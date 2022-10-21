import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AgoraVideoPlayer } from "agora-rtc-react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { db } from "../config/Firebase";
import { onValue, ref } from "firebase/database";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const Videos = ({ users, tracks, userName, usersInCall, myCamera }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const fbQuery = ref(db, "users");
    setIsLoading(false);
    return onValue(fbQuery, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setUserNames(data);
      }
    });
  }, []);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid
        item
        container
        xs={2}
        direction="column"
        sx={{
          backgroundColor: "#FBBF77",
          marginTop: "2rem",
          padding: "0.5rem",
          height: "50%",
          borderRadius: "0.25rem",
        }}
      >
        <Grid item sx={{ margin: "0.3rem" }}>
          <Typography variant="h6">People in Call ⬇ </Typography>
        </Grid>
        <Grid
          item
          sx={{
            padding: "0.3rem",
          }}
        >
          <Typography fontWeight="bold">{userName} (You)</Typography>
        </Grid>
        {usersInCall?.map((user) => (
          <Grid
            item
            key={user.uid}
            sx={{
              padding: "0.3rem",
            }}
            container
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                fontWeight="bold"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {userNames[user.uid]}
              </Typography>
            </Grid>
            <Grid item>
              {user.videoTrack !== undefined ? (
                <VideocamIcon color="primary" />
              ) : (
                <VideocamOffIcon color="secondary" />
              )}
            </Grid>
            <Grid item>
              {user._audio_muted_ ? (
                <MicOffIcon color="secondary" />
              ) : (
                <MicIcon color="primary" />
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>

      {/* Video Wrapper for Current User */}
      <Grid
        container
        item
        xs={10}
        justifyContent="center"
        alignItems="center"
        direction="column"
        height="100%"
        sx={{
          paddingTop: "6%",
        }}
        gap={2}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          gap={2}
        >
          <Grid
            item
            xs={4}
            sx={{
              borderRadius: "1rem",
              backgroundColor: "#add8e6",
              padding: "1rem",
            }}
          >
            <Typography variant="h6" align="center">
              {userName}
            </Typography>
            {myCamera ? (
              <AgoraVideoPlayer videoTrack={tracks[1]} />
            ) : (
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                <Grid item>
                  <Typography variant="h6" align="center">
                    Camera Off
                  </Typography>
                </Grid>
                <Grid item>
                  <VideocamOffIcon color="secondary" />
                </Grid>
              </Grid>
            )}
          </Grid>
          {users.length > 0 && (
            <Grid
              item
              xs={4}
              sx={{
                borderRadius: "1rem",
                backgroundColor: "#add8e6",
                padding: "1rem",
              }}
            >
              <Typography variant="h6" align="center">
                {userNames[users[0].uid]}
              </Typography>
              <AgoraVideoPlayer videoTrack={users[0].videoTrack} />
            </Grid>
          )}
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          gap={2}
        >
          {users.length > 1 && (
            <Grid
              item
              xs={4}
              sx={{
                borderRadius: "1rem",
                backgroundColor: "#add8e6",
                padding: "1rem",
              }}
            >
              <Typography variant="h6" align="center">
                {userNames[users[1].uid]}
              </Typography>
              <AgoraVideoPlayer videoTrack={users[1].videoTrack} />
            </Grid>
          )}
          {users.length > 2 && (
            <Grid
              item
              xs={4}
              sx={{
                borderRadius: "1rem",
                backgroundColor: "#add8e6",
                padding: "1rem",
              }}
            >
              <Typography variant="h6" align="center">
                {userNames[users[2].uid]}
              </Typography>
              <AgoraVideoPlayer videoTrack={users[2].videoTrack} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Videos;

Videos.propTypes = {
  users: PropTypes.array.isRequired,
  tracks: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  usersInCall: PropTypes.array.isRequired,
  myCamera: PropTypes.bool.isRequired,
};
