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

function Videos({ users, tracks, userName, usersInCall, myCamera }) {
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
      <Grid
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
      </Grid>

      {/* Video Wrapper for Current User */}
      <Grid
        container
        item
        xs={10}
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
            <Grid item xs={4} className={classes.videoWrapper}>
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
            <Grid item xs={4} className={classes.videoWrapper}>
              <Typography variant="h6" align="center">
                {userNames[users[1].uid]}
              </Typography>
              <AgoraVideoPlayer videoTrack={users[1].videoTrack} />
            </Grid>
          )}
          {users.length > 2 && (
            <Grid item xs={4} className={classes.videoWrapper}>
              <Typography variant="h6" align="center">
                {userNames[users[2].uid]}
              </Typography>
              <AgoraVideoPlayer videoTrack={users[2].videoTrack} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Videos

Videos.propTypes = {
  users: PropTypes.array.isRequired,
  tracks: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired,
  usersInCall: PropTypes.array.isRequired,
  myCamera: PropTypes.bool.isRequired,
}
