import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/helpers";
import { Grid, Typography } from "@mui/material";

const Message = ({ createdAt, text, displayName, userId }) => {
  return (
    <Grid
      container
      direction="column"
      padding={2}
      sx={{
        backgroundColor: "#add8e6",
        borderRadius: "10px",
      }}
    >
      <Grid item container gap={2}>
        <Grid item>
          {displayName ? (
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {displayName}
            </Typography>
          ) : (
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              No Name
            </Typography>
          )}
        </Grid>
        <Grid item>
          {createdAt?.seconds ? (
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
  );
};

export default Message;

Message.propTypes = {
  createdAt: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
