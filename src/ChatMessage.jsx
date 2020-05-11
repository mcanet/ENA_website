import React from "react";

export default ({ name, message, color }) => (
  <p>
    <span style={color}><strong>{name}</strong></span>: <em>{message}</em>
  </p>
);
