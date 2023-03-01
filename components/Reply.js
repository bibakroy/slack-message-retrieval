import React, { useEffect, useState } from "react";
import axios from "axios";

export const Reply = ({ ts, channelName }) => {
  const [replies, setReplies] = useState([]);

  const handleReply = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/conversations/replies",
        {
          data: { ts, channelName: channelName },
        }
      );
      const replies = res.data.replies;
      console.log({ replies });
      setReplies(replies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleReply();
  }, []);

  return (
    <div>
      <b>Reply: </b>
      {replies.map((reply) => {
        if (reply.thread_ts === reply.ts) return;
        return (
          <div key={reply.ts}>
            <p style={{ fontSize: "12px" }}>{reply.text}</p>
          </div>
        );
      })}
    </div>
  );
};
