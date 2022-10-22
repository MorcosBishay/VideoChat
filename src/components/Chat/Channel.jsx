import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { firestore } from "../../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import Message from "./Message";
import { Button, Grid, TextField, Typography } from "@mui/material";
import styles from "./styles";
import useClasses from "../../hooks/useClasses";
import Loading from "../Loading/Loading";

const Channel = ({ user, userName }) => {
  const classes = useClasses(styles);

  const messageRef = collection(firestore, "messages");
  const q = query(messageRef, orderBy("createdAt"), limit(100));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    // Clear input field
    setNewMessage("");
    if (trimmedMessage) {
      // Add new message in Firestore
      await addDoc(messageRef, {
        text: trimmedMessage,
        createdAt: Timestamp.fromDate(new Date()),
        uid: user.uid,
        displayName: userName,
      });
    }
  };

  useEffect(async () => {
    const querySnapshot = await getDocs(q);
    setMessages(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    setIsLoading(false);
  }, [handleOnSubmit]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.channelContainer}
      >
        <Grid item>
          <Typography variant="h6" align="center">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.div}>
        <ul className={classes.ul}>
          {messages.map((message) => (
            <div key={message.id} className={classes.messageContainer}>
              <Message
                createdAt={message.createdAt}
                text={message.text}
                displayName={message.displayName}
                userId={message.id}
              />
            </div>
          ))}
        </ul>
        <form onSubmit={handleOnSubmit}>
          <Grid
            container
            justifyContent="space-between"
            className={classes.formContainer}
            gap={1}
          >
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Type your message here..."
                variant="standard"
              />
            </Grid>
            <Grid item xs={2}>
              <Button type="submit" disabled={!newMessage} variant="text">
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default Channel;

Channel.propTypes = {
  user: PropTypes.object.isRequired || PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};
