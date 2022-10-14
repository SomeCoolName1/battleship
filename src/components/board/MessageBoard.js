import { useContext, useEffect, useState } from "react";
import { storage } from "../Context";

const MessageBoard = () => {
  const { state, dispatch } = useContext(storage);
  const { message } = state;
  const [displayMessage, setMessage] = useState("");

  useEffect(() => {
    dispatch({
      type: "DISPLAY_MESSAGE",
      payload: `Awaiting orders . . . . .`,
    });
  }, [dispatch]);

  useEffect(() => {
    if (message) messageHandling(message);
    setMessage("");
  }, [message]);

  const messageHandling = (message) => {
    const messageArray = message.split("");
    let counter = 0;
    let messageDisplay = [];
    const typingInterval = setInterval(() => {
      messageDisplay.push(messageArray[counter]);
      setMessage(messageDisplay.join(""));
      counter++;
      if (counter >= messageArray.length) clearInterval(typingInterval);
    }, 80);
  };

  return <div>{displayMessage}</div>;
};

export default MessageBoard;
