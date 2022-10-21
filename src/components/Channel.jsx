import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { firestore } from "../config/Firebase";
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

const Channel = ({ user, userName }) => {
  const messageRef = collection(firestore, "messages");
  const q = query(messageRef, orderBy("createdAt"), limit(100));

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      await addDoc(messageRef, {
        text: trimmedMessage,
        createdAt: Timestamp.fromDate(new Date()),
        uid: user.uid,
        displayName: userName,
      });
      // Clear input field
      setNewMessage("");
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
  }, [handleOnSubmit]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{
          backgroundColor: "#FBBF77",
          borderRadius: "10px",
          height: "8%",
        }}
      >
        <Grid item>
          <Typography variant="h6" align="center">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
        }}
      >
        <ul
          style={{
            padding: 5,
            height: "100vh",
            overflowY: "scroll",
            listStyle: "none",
            borderRadius: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "#add8e6 transparent",
            margin: "0",
            marginBottom: "10px",
            "&::-webkit-scrollbar": {
              borderRadius: 10,
              width: 7,
              backgroundColor: "lightgrey",
              backgroundWidth: 2,
              scrollbarGutter: "stable",
            },
            "&::-webkit-scrollbar-track": {
              borderRadius: 10,
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: 10,
              scrollPaddingLeft: 50,
              backgroundColor: "#add8e6",
              minHeight: 24,
              minWidth: 24,
            },
            "&::-webkit-scrollbar-thumb:focus": {
              backgroundColor: "#add8e6",
            },
            "&::-webkit-scrollbar-thumb:active": {
              backgroundColor: "#add8e6",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#add8e6",
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                marginBottom: "10px",
              }}
            >
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
            sx={{
              padding: 2,
              backgroundColor: "#FBBF77",
              borderRadius: "10px",
            }}
            gap={1}
          >
            <Grid item xs={9}>
              <TextField
                sx={{
                  width: "100%",
                }}
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
