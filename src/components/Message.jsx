import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

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
