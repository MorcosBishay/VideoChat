/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import formatDate from '../../utils/helpers'
import styles from './styles'
import useClasses from '../../hooks/useClasses'

function Message({ createdAt, text, displayName }) {
  const classes = useClasses(styles)

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container gap={2}>
        <Grid item>
          {displayName ? (
            <Typography className={classes.nameTypography}>
              {displayName}
            </Typography>
          ) : (
            <Typography className={classes.nameTypography}>No Name</Typography>
          )}
        </Grid>
        <Grid item>
          {createdAt.seconds ? (
            <Typography>
              {formatDate(new Date(createdAt.seconds * 1000))}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      <Grid item>
        <Typography>Message ➡ {text}</Typography>
      </Grid>
    </Grid>
  )
}

export default Message

Message.propTypes = {
  createdAt: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
}
