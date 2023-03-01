import React, { useState } from "react";
import { Reply } from "./Reply";

const Message = ({ message, channelName }) => {
  return (
    <div>
      <p style={{ fontSize: "20px", fontWeight: "500" }}>{message.text}</p>

      {message.thread_ts && <Reply ts={message.ts} channelName={channelName} />}
    </div>
  );
};

export default Message;
