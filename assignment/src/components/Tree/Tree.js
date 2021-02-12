import React, { useEffect, useState, useCallback } from "react";
import { TreeNode } from "../TreeNode/TreeNode";

export const Tree = () => {
  const [nodes, setNodes] = useState([]);

  const data = [
    {
      title: "aa",
      children: [
        {
          title: "as",
          children: [{ title: "gg", children: [{ title: "www" }] }],
        },
      ],
    },
    { title: "bbb" },
    { title: "ssss" },
  ];

  const initializedCopy = useCallback(
    (nodes, location) => {
      const nodesCopy = [];
      for (let i = 0; i < nodes.length; i++) {
        const { children, title } = nodes[i];
        const hasChildren = children !== undefined;
        const id = location ? `${location}.${i + 1}` : `${i + 1}`;
        nodesCopy[i] = {
          id,
          title,
          children: hasChildren ? initializedCopy(children, id) : undefined,
          changeTitle: changeTitle(id),
        };
      }

      return nodesCopy;
    },
    [nodes, setNodes]
  );

  const changeTitle = useCallback((id) => {
    return (newTitle) => {
      let idCopy = id;
      idCopy = idCopy.split(".").map((str) => parseInt(str));
      const nodesCopy = initializedCopy([...nodes]);
      console.log(nodesCopy);
      let changingNode = nodesCopy[idCopy[0] - 1];
      if (id.length > 1) {
        for (let i = 1; i < id.length; i++) {
          changingNode = changingNode.children[idCopy[i] - 1];
        }
      }

      changingNode.title = newTitle;
      setNodes(nodesCopy);
    };
  }, []);

  useEffect(() => {
    setNodes(initializedCopy(data));
  }, []);

  return (
    <>
      {nodes.map((nodeProps) => {
        const { id, ...props } = nodeProps;
        return <TreeNode key={id} {...props} />;
      })}
    </>
  );
};

{
  /* <div style={{ position: "absolute", right: "0px" }}>
         <pre>{JSON.stringify(nodes, null, 2)}</pre>
       </div> */
}
