import React from "react";

export const EditableItem = (props) => {
  const { title, changeTitle } = props;

  return (
    <input
      value={title}
      onChange={(e) => {
        changeTitle(e.target.value);
      }}
    />
  );
};
