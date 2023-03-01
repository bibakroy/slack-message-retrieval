import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Message from "../components/Message";

export default function Home() {
  const [channelName, setChannelName] = useState("general");
  const [messages, setMessages] = useState([]);

  const getMessages = async (channelName) => {
    setMessages([]);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/conversations/messages",
        {
          data: { channelName: channelName },
        }
      );
      const messages = res.data.messages;
      console.log({ messages });
      setMessages(messages.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessage = (e) => {
    e.preventDefault();
    if (!channelName) return;
    getMessages(channelName);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => {
          handleMessage(e);
        }}
      >
        <input
          value={channelName}
          onChange={(e) => {
            setChannelName(e.target.value);
          }}
        />
        <button type="submit">See Messages</button>
      </form>

      {messages.map((message) => {
        return (
          <Message
            message={message}
            channelName={channelName}
            key={message.ts}
          />
        );
      })}
    </div>
  );
}
