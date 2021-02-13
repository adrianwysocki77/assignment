import React, { useState } from "react";

export const EditableItem = (props) => {
  const {
    title,
    changeTitle,
    addChild,
    removeNode,
    changeChildrenVisibility,
  } = props;
  const [editCategory, setEditCategory] = useState(false);

  return (
    <div className="input-group mb-2 col-md-4 ml-1">
      {!editCategory ? (
        <div
          className="form-control text-primary"
          onClick={changeChildrenVisibility}
        >
          {title}
        </div>
      ) : (
        <input
          value={title}
          onChange={(e) => {
            changeTitle(e.target.value);
          }}
          className="form-control"
        />
      )}

      <button
        className={`btn btn-${!editCategory ? "primary" : "warning"} ml-2`}
        onClick={() => setEditCategory((prevState) => !prevState)}
      >
        {editCategory ? "Save" : "Edit"}
      </button>

      <button
        type="button"
        className="btn btn-success input-group-append ml-2"
        onClick={addChild}
      >
        +
      </button>
      <button
        type="button"
        className="btn btn-danger input-group-append ml-2"
        onClick={removeNode}
      >
        x
      </button>
    </div>
  );
};
