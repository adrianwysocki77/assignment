import React from "react";

export const EditableItem = (props) => {
  const { title, changeTitle, addChild } = props;

  return (
    <>
      <button
        className="EditableItem-Button EditableItem-Button_add"
        onClick={addChild}
      >
        +
      </button>

      <input
        value={title}
        onChange={(e) => {
          changeTitle(e.target.value);
        }}
      />
    </>
  );
};
