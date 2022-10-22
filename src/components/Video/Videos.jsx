/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AgoraVideoPlayer } from 'custom-agora-rtc-react'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { onValue, ref } from 'firebase/database'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import { db } from '../../config/Firebase'
import Loading from '../Loading/Loading'
import styles from './styles'
import useClasses from '../../hooks/useClasses'

function Videos({ tracks, userName, usersInCall, myCamera, myMicrophone }) {
  const classes = useClasses(styles)

  const [isLoading, setIsLoading] = useState(true)
  const [userNames, setUserNames] = useState([])

  useEffect(() => {
    const fbQuery = ref(db, 'users')
    return onValue(fbQuery, (snapshot) => {
      const data = snapshot.val()
      if (snapshot.exists()) {
        setUserNames(data)
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.rootVideos}
    >
      {/* <Grid
        item
        container
        xs={2}
        direction="column"
        className={classes.userNamesGrid}
        alignSelf="flex-end"
      >
        <Grid item className={classes.peopleInCallGrid}>
          <Typography variant="h6">People in Call ⬇ </Typography>
        </Grid>
        <Grid item className={classes.userNameGrid}>
          <Typography fontWeight="bold" className={classes.userNameTypography}>
            {userName} (You)
          </Typography>
        </Grid>
        {usersInCall.map((user) => (
          <Grid
            item
            key={user.uid}
            className={classes.userNameGrid}
            container
            justifyContent="space-between"
          >
            <Grid item xs={8}>
              <Typography
                fontWeight="bold"
                className={classes.userNameTypography}
              >
                {userNames[user.uid]}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {user.videoTrack !== undefined ? (
                <VideocamIcon color="primary" />
              ) : (
                <VideocamOffIcon color="secondary" />
              )}
            </Grid>
            <Grid item xs={2}>
              {user._audio_muted_ ? (
                <MicOffIcon color="secondary" />
              ) : (
                <MicIcon color="primary" />
              )}
            </Grid>
          </Grid>
        ))}
      </Grid> */}

      {/* Video Wrapper for Current User */}
      <Grid
        container
        item
        xs={11}
        gap={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.userVideoGrid}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          gap={2}
        >
          <Grid item xs={4} className={classes.videoWrapper}>
            <Grid
              item
              className={classes.userNameGrid}
              container
              justifyContent="center"
            >
              <Grid item mr={2}>
                <Typography
                  fontWeight="bold"
                  className={classes.userNameTypography}
                >
                  {userName}
                </Typography>
              </Grid>
              <Grid item>
                {myCamera ? (
                  <VideocamIcon color="primary" />
                ) : (
                  <VideocamOffIcon color="secondary" />
                )}
              </Grid>
              <Grid item>
                {myMicrophone ? (
                  <MicIcon color="primary" />
                ) : (
                  <MicOffIcon color="secondary" />
                )}
              </Grid>
            </Grid>
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
                  <Typography variant="h6" align="center" color="secondary">
                    Camera Off
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          {usersInCall.length > 0 && (
            <Grid item xs={4} className={classes.videoWrapper}>
              <Grid
                item
                className={classes.userNameGrid}
                container
                justifyContent="center"
              >
                <Grid item mr={2}>
                  <Typography
                    fontWeight="bold"
                    className={classes.userNameTypography}
                  >
                    {userNames[usersInCall[0].uid]}
                  </Typography>
                </Grid>
                <Grid item>
                  {usersInCall[0].videoTrack ? (
                    <VideocamIcon color="primary" />
                  ) : (
                    <VideocamOffIcon color="secondary" />
                  )}
                </Grid>
                <Grid item>
                  {!usersInCall[0]._audio_muted_ ? (
                    <MicIcon color="primary" />
                  ) : (
                    <MicOffIcon color="secondary" />
                  )}
                </Grid>
              </Grid>
              {usersInCall[0].videoTrack !== undefined ? (
                <AgoraVideoPlayer videoTrack={usersInCall[0].videoTrack} />
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Grid item>
                    <Typography variant="h6" align="center" color="secondary">
                      Camera Off
                    </Typography>
                  </Grid>
                </Grid>
              )}
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
          {usersInCall.length > 1 && (
            <Grid item xs={4} className={classes.videoWrapper}>
              <Grid
                item
                className={classes.userNameGrid}
                container
                justifyContent="center"
              >
                <Grid item mr={2}>
                  <Typography
                    fontWeight="bold"
                    className={classes.userNameTypography}
                  >
                    {userNames[usersInCall[1].uid]}
                  </Typography>
                </Grid>
                <Grid item>
                  {usersInCall[1].videoTrack ? (
                    <VideocamIcon color="primary" />
                  ) : (
                    <VideocamOffIcon color="secondary" />
                  )}
                </Grid>
                <Grid item>
                  {!usersInCall[1]._audio_muted_ ? (
                    <MicIcon color="primary" />
                  ) : (
                    <MicOffIcon color="secondary" />
                  )}
                </Grid>
              </Grid>
              {usersInCall[1].videoTrack !== undefined ? (
                <AgoraVideoPlayer videoTrack={usersInCall[1].videoTrack} />
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Grid item>
                    <Typography variant="h6" align="center" color="secondary">
                      Camera Off
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
          {usersInCall.length > 2 && (
            <Grid item xs={4} className={classes.videoWrapper}>
              <Grid
                item
                className={classes.userNameGrid}
                container
                justifyContent="center"
              >
                <Grid item mr={2}>
                  <Typography
                    fontWeight="bold"
                    className={classes.userNameTypography}
                  >
                    {userNames[usersInCall[2].uid]}
                  </Typography>
                </Grid>
                <Grid item>
                  {usersInCall[2].videoTrack ? (
                    <VideocamIcon color="primary" />
                  ) : (
                    <VideocamOffIcon color="secondary" />
                  )}
                </Grid>
                <Grid item>
                  {!usersInCall[2]._audio_muted_ ? (
                    <MicIcon color="primary" />
                  ) : (
                    <MicOffIcon color="secondary" />
                  )}
                </Grid>
              </Grid>
              {usersInCall[2].videoTrack !== undefined ? (
                <AgoraVideoPlayer videoTrack={usersInCall[2].videoTrack} />
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                >
                  <Grid item>
                    <Typography variant="h6" align="center" color="secondary">
                      Camera Off
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Videos

Videos.propTypes = {
  tracks: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  usersInCall: PropTypes.array.isRequired,
  myCamera: PropTypes.bool.isRequired,
  myMicrophone: PropTypes.bool.isRequired,
}
