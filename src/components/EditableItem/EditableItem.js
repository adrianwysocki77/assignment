import React, { useState, useCallback } from "react";

export const EditableItem = (props) => {
  const {
    title,
    changeTitle,
    addChild,
    removeNode,
    changeChildrenVisibility,
  } = props;
  const [editCategory, setEditCategory] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);

  const collapse = useCallback(() => {
    changeChildrenVisibility();
    setArrowDown((state) => !state);
  }, [arrowDown, setArrowDown]);

  return (
    <div className="row mt-2">
      <div className="mb-2  col-md-3">
        {!editCategory ? (
          <div className="form-control text-primary" onClick={collapse}>
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

        <img
          src={window.location.origin + "/arrow.svg"}
          className={arrowDown ? "arrow-icon rotate" : "arrow-icon"}
          style={{ position: "absolute", right: "25px", bottom: "13px" }}
          onClick={collapse}
        />
      </div>
      <div className="col-md-3">
        <div className="d-flex align-items-start">
          <button
            className={`btn btn-${!editCategory ? "primary" : "warning"}`}
            onClick={() => setEditCategory((prevState) => !prevState)}
          >
            {editCategory ? "Save" : "Edit"}
          </button>
          <button
            type="button"
            className="btn btn-success ml-2"
            onClick={addChild}
          >
            +
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            onClick={removeNode}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};
