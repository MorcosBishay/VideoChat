import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ReactComponent as Logo } from "../../assets/vite.svg";
import styles from "./styles";
import useClasses from "../../hooks/useClasses";

export default function Loading() {
  const classes = useClasses(styles);

  return (
    <div className={classes.root}>
      <div className={classes.progress}>
        <CircularProgress
          variant="indeterminate"
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={280}
          thickness={0.5}
        />
        <Logo className={classes.logo} />
      </div>
    </div>
  );
}
