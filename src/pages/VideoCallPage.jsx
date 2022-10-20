import React, { useState, useEffect } from "react";
import VideoCall from "../components/VideoCall";
import { db } from "../config/Firebase";
import { onValue, ref, set } from "firebase/database";
import JoinPage from "./JoinPage";

const VideoCallPage = () => {
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

  return (
    <>
      {inCall ? (
        <VideoCall
          handleInCall={handleInCall}
          users={users}
          handleUsers={handleUsers}
          userName={userName}
          usersNumber={usersNumber}
        />
      ) : (
        <JoinPage
          usersNumber={usersNumber}
          handleInCall={handleInCall}
          userName={userName}
          setUserName={setUserName}
        />
      )}
    </>
  );
};

export default VideoCallPage;
