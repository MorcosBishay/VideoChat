import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const Join = ({
  usersNumber,
  handleInCall,
  setUserName,
  userName,
  handleSignIn,
}) => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "95vh",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={24}
        sx={{
          width: "50%",
          padding: "2rem",
          height: "50%",
          backgroundColor: "#FBBF77",
        }}
      >
        <Grid
          container
          justifyContent="space-around"
          direction="column"
          sx={{
            height: "100%",
          }}
        >
          <Grid item>
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Welcome <br /> React + Agora Video Chat
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" direction="row">
            <Grid item>
              <TextField
                placeholder="Enter Your Name"
                variant="standard"
                sx={{ marginRight: 2 }}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                disabled={userName.length <= 0}
                sx={{
                  textTransform: "none",
                  color: "white",
                  backgroundColor: "#3f51b5",
                  "&:hover": {
                    color: "#3f51b5",
                    backgroundColor: "#fff",
                  },
                  "&:disabled": {
                    color: "#fff",
                    backgroundColor: "gray",
                  },
                }}
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
