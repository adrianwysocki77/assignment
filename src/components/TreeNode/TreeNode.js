import React from "react";
import { EditableItem } from "../EditableItem/EditableItem";

export const TreeNode = ({ children, childrenVisibility, ...props }) => {
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
    <div className="flex-column ml-3">
      <EditableItem {...props} />
      {childrenVisibility && hasChildren && renderChildren(children)}
    </div>
  );
};
