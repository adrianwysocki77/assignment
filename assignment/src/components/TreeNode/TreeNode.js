import React from "react";
import { EditableItem } from "../EditableItem/EditableItem";

export const TreeNode = ({ children, ...props }) => {
  const hasChildren = children !== undefined;

  const renderChildren = (children) => {
    return (
      <>
        {children.map((nodeProps) => {
          const { id, ...props } = nodeProps;

          return <TreeNode key={id} {...props} />;
        })}
      </>
    );
  };

  return (
    <div style={{ marginLeft: "10px" }}>
      <EditableItem {...props} />
      {hasChildren && renderChildren(children)}
    </div>
  );
};
