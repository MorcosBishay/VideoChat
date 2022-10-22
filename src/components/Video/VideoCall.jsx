/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import { update, ref, set } from 'firebase/database'
import { Typography } from '@mui/material'
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from '../../config/settings'
import Controls from './Controls'
import Videos from './Videos'
import { db } from '../../config/Firebase'
import Loading from '../Loading/Loading'
import styles from './styles'
import useClasses from '../../hooks/useClasses'

function VideoCall({
  handleInCall,
  users,
  handleUsers,
  userName,
  handleSignOut,
}) {
  const classes = useClasses(styles)
  const client = useClient()

  const { ready, tracks } = useMicrophoneAndCameraTracks()
  const [start, setStart] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [myCamera, setMyCamera] = useState(true)
  const [myMicrophone, setMyMicrophone] = useState(true)
  const [usersInCall, setUsersInCall] = useState([])

  const handleStart = (state) => setStart(state)

  useEffect(() => {
    async function updateFirebase() {
      if (client._uid !== undefined) {
        await update(ref(db, 'users'), {
          [client._uid]: userName,
        })
        await set(ref(db, 'usersCount'), usersInCall.length)
      }
    }
    updateFirebase()
  }, [client, users])

  useEffect(async () => {
    const init = async (name) => {
      client.on('user-joined', (user) => {
        setUsersInCall((arr) => [...arr, user])
      })

      // User Publishes
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType)
        if (mediaType === 'video') {
          await handleUsers((pervUsers) => [...pervUsers, user])
          await handleUsers((prev) =>
            prev.map((ussr) => (ussr.uid === user.uid ? user : ussr)),
          )
        }
        if (mediaType === 'audio') {
          user.audioTrack.play()
          await handleUsers((prev) =>
            prev.map((ussr) => (ussr.uid === user.uid ? user : ussr)),
          )
        }
      })

      // User Unpublished
      client.on('user-unpublished', async (user, mediaType) => {
        if (mediaType === 'audio') {
          if (user.audioTrack) user.audioTrack.stop()
          if (user.videoTrack)
            await handleUsers((prev) =>
              prev.map((ussr) => (ussr.uid === user.uid ? user : ussr)),
            )
        }
        if (mediaType === 'video') {
          handleUsers((prevUsers) =>
            prevUsers.filter((u) => u.uid !== user.uid),
          )
        }
      })

      // User Left
      client.on('user-left', (user) => {
        handleUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid))
        setUsersInCall((arr) => arr.filter((u) => u.uid !== user.uid))
      })

      // Join Channel
      try {
        await client.join(config.appId, name, config.token, null)
      } catch (err) {
        console.log(err)
      }

      // Publish Tracks
      if (tracks) await client.publish([tracks[0], tracks[1]])

      // Set Start
      setStart(true)
    }

    // Initialize
    if (ready && tracks) {
      try {
        await init(channelName)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
  }, [channelName, client, ready, tracks])

  if (isLoading) return <Loading />

  return (
    <Grid container direction="row" className={classes.root} gap={1}>
      <Grid item className={classes.controlsRoot} xs={12}>
        {ready && tracks && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            className={classes.controlsSubRoot}
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
                setMyMicrophone={setMyMicrophone}
                handleSignOut={handleSignOut}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item className={classes.videoGrid} xs={12}>
        {start && tracks && (
          <Videos
            tracks={tracks}
            users={users}
            userName={userName}
            usersInCall={usersInCall}
            myCamera={myCamera}
            myMicrophone={myMicrophone}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default VideoCall

VideoCall.propTypes = {
  handleInCall: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  handleUsers: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
}
