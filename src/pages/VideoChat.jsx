import React, { useState, useEffect } from "react";
import VideoCall from "../components/Video/VideoCall";
import { db } from "../config/Firebase";
import { onValue, ref, set } from "firebase/database";
import Join from "./Join/Join";

// Chat Section
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import Channel from "../components/Chat/Channel";
import { Grid } from "@mui/material";

const VideoChat = () => {
  const fbQuery = ref(db, "usersCount");

  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [usersNumber, setUsersNumber] = useState(0);
  const [inCall, setInCall] = useState(false);

  // Get Users Number From Firebase
  useEffect(() => {
    return onValue(fbQuery, (snapshot) => {
      const usersCount = snapshot.val();
      if (snapshot.exists()) {
        setUsersNumber(usersCount);
      }
    });
  }, [usersNumber]);

  // Handle Calls & Set Users Number In Firebase
  const handleInCall = async (state) => {
    setInCall(state);
    if (state) {
      await set(fbQuery, usersNumber + 1);
      setUsersNumber(usersNumber + 1);
    } else {
      if (usersNumber > 0) {
        await set(fbQuery, usersNumber - 1);
        setUsersNumber(usersNumber - 1);
      }
      if (usersNumber <= 1) {
        await set(ref(db, "users"), {});
      }
      window.location.reload();
    }
  };

  // Handle Users
  const handleUsers = (users) => setUsers(users);

  // Chat Section
  const auth = getAuth();
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  // Handle Sign In
  const handleSignIn = () => {
    signInAnonymously(auth)
      .then(() => {
        auth.useDeviceLanguage();
        setInitializing(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Handle Sign Out
  const handleSignOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ ...user, displayName: userName });
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  return (
    <>
      {inCall ? (
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <VideoCall
              users={users}
              userName={userName}
              usersNumber={usersNumber}
              handleInCall={handleInCall}
              handleUsers={handleUsers}
              handleSignOut={handleSignOut}
            />
          </Grid>
          <Grid item xs={3}>
            <Channel user={user} userName={userName} />
          </Grid>
        </Grid>
      ) : (
        <Join
          usersNumber={usersNumber}
          userName={userName}
          handleInCall={handleInCall}
          setUserName={setUserName}
          handleSignIn={handleSignIn}
        />
      )}
    </>
  );
};

export default VideoChat;
