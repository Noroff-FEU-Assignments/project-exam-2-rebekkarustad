import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { BASE_API, POST_PATH } from "../../constants/api";

export default function Emoji({ data }) {
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);

  function toggleEmojiPanel() {
    setShowEmojiPanel(!showEmojiPanel);
  }

  let { id } = useParams();

  async function onClick(emoji) {
    const getToken = window.localStorage.getItem("token");
    const emojiUrl = BASE_API + POST_PATH + `/${id}/react/${emoji.emoji}`;

    await axios({
      method: "put",
      url: emojiUrl,
      data: emoji,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    setShowEmojiPanel(!showEmojiPanel);
  }

  return (
    <div className="feed__post--emoji-container">
      <button
        className="button button-wht-border button-sml"
        onClick={toggleEmojiPanel}
      >
        React
      </button>
      {data.map((reaction, i) => (
        <p key={i} className="emoji">
          {reaction.symbol}
        </p>
      ))}
      {data.length < 1 && <p>0 reactions</p>}
      {showEmojiPanel && <EmojiPicker onEmojiClick={onClick} />}
    </div>
  );
}
