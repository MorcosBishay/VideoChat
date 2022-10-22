import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import styles from "./styles";
import useClasses from "../../hooks/useClasses";

const Join = ({
  usersNumber,
  handleInCall,
  setUserName,
  userName,
  handleSignIn,
}) => {
  const classes = useClasses(styles);

  return (
    <Grid
      container
      className={classes.root}
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={24} className={classes.paper}>
        <Grid
          container
          justifyContent="space-around"
          direction="column"
          className={classes.columnGrid}
        >
          <Grid item>
            <Typography variant="h2" className={classes.typography}>
              Welcome <br />
              React + Agora + Firebase <br />
              Video Chat
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" direction="row">
            <Grid item>
              <TextField
                placeholder="Enter Your Name"
                variant="standard"
                className={classes.textField}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                disabled={userName.length <= 0}
                className={classes.joinButton}
                onClick={() => {
                  if (usersNumber < 3) {
                    handleInCall(true);
                    handleSignIn();
                  } else {
                    alert("The maximum of 4 users has been reached");
                  }
                }}
              >
                Join Call Now!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Join;

Join.propTypes = {
  usersNumber: PropTypes.number.isRequired,
  handleInCall: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  handleSignIn: PropTypes.func.isRequired,
};
