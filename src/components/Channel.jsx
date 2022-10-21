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
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <Message
              createdAt={message.createdAt}
              text={message.text}
              displayName={message.displayName}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="Type your message here..."
        />
        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
    </>
  );
};

export default Channel;

Channel.propTypes = {
  user: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
};
