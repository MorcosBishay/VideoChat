import React, { useState, useEffect } from "react";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const ChatPage = () => {
  const auth = getAuth();
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  const handleSignIn = () => {
    signInAnonymously(auth)
      .then(() => {
        auth.useDeviceLanguage();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ ...user, uid: 1, displayName: "Anonymous" });
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
      <button onClick={handleSignIn}>sign in</button>
      <button onClick={() => auth.signOut()}>sign out</button>
    </>
  );
};

export default ChatPage;
