import React, { useEffect, useState, useCallback } from "react";
import { TreeNode } from "../TreeNode/TreeNode";
import { AddButton } from "../AddButton/AddButton";

export const Tree = () => {
  const [nodes, setNodes] = useState([]);

  const data = [
    {
      title: "Adrian",
      children: [
        {
          title: "Kasia",
          children: [{ title: "Łukasz", children: [{ title: "Luiza" }] }],
        },
      ],
    },
    { title: "Maks" },
    { title: "Mirek" },
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
          addChild: addChild(id),
        };
      }

      return nodesCopy;
    },
    [nodes, setNodes]
  );

  const changeTitle =
    // useCallback(
    (id) => {
      return (newTitle) => {
        if (!Array.isArray(id)) {
          id = id.split(".").map((str) => parseInt(str));
        }

        setNodes((nodes) => {
          let nodesCopy = initializedCopy([...nodes]);
          let changingNode = nodesCopy[id[0] - 1];
          if (id.length > 1) {
            for (let i = 1; i < id.length; i++) {
              changingNode = changingNode.children[id[i] - 1];
            }
          }
          changingNode.title = newTitle;
          return nodesCopy;
        });
      };
    };
  // ,
  // [nodes, setNodes]
  // );

  const addRootElement = useCallback(() => {
    {
      const id = nodes.length ? `${nodes.length + 1}` : "1";
      const newNode = {
        children: undefined,
        changeTitle: changeTitle(id),
        // removeNode: removeNode(id),
        // addChild: addChild(id),
        id,
        title: "New Category",
      };

      setNodes((nodes) => {
        return [...nodes, newNode];
      });
    }
  }, [nodes, setNodes]);

  const addChild = useCallback(
    (id) => {
      return () => {
        console.log("id", id);

        if (!Array.isArray(id)) {
          id = id.split(".").map((str) => parseInt(str));
        }

        setNodes((nodes) => {
          let nodesCopy = initializedCopy([...nodes]);
          let changingNode = nodesCopy[id[0] - 1];

          if (id.length > 1) {
            for (let i = 1; i < id.length; i++) {
              changingNode = changingNode.children[id[i] - 1];
            }
          }

          if (changingNode.children === undefined) {
            changingNode.children = [];
          }
          let idCopy = `${id.join(".")}.${changingNode.children.length + 1}`;

          changingNode.children = [
            ...changingNode.children,
            {
              children: undefined,
              changeTitle: changeTitle(idCopy),
              // removeNode: this.removeNode(idCopy),
              addChild: addChild(idCopy),
              id: idCopy,
              title: "",
            },
          ];

          return nodesCopy;
        });
      };
    },
    [nodes, setNodes]
  );

  useEffect(() => {
    setNodes(initializedCopy(data));
  }, []);

  return (
    <>
      {nodes.map((nodeProps) => {
        const { id, ...props } = nodeProps;
        return <TreeNode key={id} {...props} />;
      })}

      <AddButton addRootElement={addRootElement} />
    </>
  );
};
