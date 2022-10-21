import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../utils/helpers";

const Message = ({ createdAt, text, displayName }) => {
  return (
    <div>
      {displayName ? <p>{displayName}</p> : null}
      {createdAt?.seconds ? (
        <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
      ) : null}
      <p>{text}</p>
    </div>
  );
};

export default Message;

Message.propTypes = {
  createdAt: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};
