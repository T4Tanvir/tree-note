import ActionType from "@/constants/action.enum";
import useTree from "@/hooks/use-tree";
import { TreeNode } from "@/type/tree";
import { memo, useCallback, useState } from "react";
import TreeFileRender from "./tree.fileRender";
import TreeFolderRender from "./tree.folderRender";
import TreeInputField from "./tree.inputField";
import TreeVerticalLine from "./tree.verticalLine";

interface FolderProps {
  explorer: TreeNode;
  level: number;
}

const Tree = memo(({ explorer, level }: FolderProps) => {
  const { insertNode, renameNode, deleteNode } = useTree();

  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
    actionType: null as ActionType | null,
  });

  const toggleExpand = useCallback(() => {
    if (showInput.actionType !== ActionType.RENAME_FOLDER) {
      setExpand((prev) => !prev);
    }
  }, [showInput.actionType]);

  const handleBlur = useCallback(() => {
    setShowInput({ visible: false, isFolder: false, actionType: null });
  }, []);

  // -----------------------------
  // ACTION HANDLER (VERY IMPORTANT)
  // -----------------------------
  const handleMenuAction = useCallback(
    (type: ActionType) => {
      // RENAME
      if (
        type === ActionType.RENAME_FOLDER ||
        type === ActionType.RENAME_FILE
      ) {
        setShowInput({
          visible: true,
          isFolder: explorer.type === "folder",
          actionType: type,
        });
        return;
      }

      setExpand(true);

      // ADD FILE / ADD FOLDER
      if (type === ActionType.ADD_FOLDER || type === ActionType.ADD_FILE) {
        setShowInput({
          visible: true,
          isFolder: type === ActionType.ADD_FOLDER,
          actionType: type,
        });
        return;
      }

      // DELETE
      if (
        type === ActionType.DELETE_FOLDER ||
        type === ActionType.DELETE_FILE
      ) {
        deleteNode(explorer.id);
        return;
      }
    },
    [explorer.id, explorer.type, deleteNode]
  );

  // -----------------------------
  // ON ENTER (Add or Rename)
  // -----------------------------
  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim().length > 0) {
      const value = e.currentTarget.value.trim();

      if (showInput.actionType === ActionType.ADD_FOLDER) {
        insertNode(explorer.id, value, true);
      }

      if (showInput.actionType === ActionType.ADD_FILE) {
        insertNode(explorer.id, value, false);
      }

      if (
        showInput.actionType === ActionType.RENAME_FILE ||
        showInput.actionType === ActionType.RENAME_FOLDER
      ) {
        renameNode(explorer.id, value);
      }

      setShowInput({ visible: false, isFolder: false, actionType: null });
    }

    if (e.key === "Escape") {
      setShowInput({ visible: false, isFolder: false, actionType: null });
    }
  };

  const isFolder = explorer.type === "folder";

  // -----------------------------
  // RENDER FOLDER
  // -----------------------------
  if (isFolder) {
    return (
      <div className="my-0.5 relative">
        <TreeVerticalLine level={level} isChildren={false} />

        <TreeFolderRender
          expand={expand}
          level={level}
          explorer={explorer}
          toggleExpand={toggleExpand}
          showInput={showInput}
          onAction={handleMenuAction}
          handleBlur={handleBlur}
          handleInputSubmit={handleInputSubmit}
        />

        {expand && (
          <div className="relative">
            <TreeVerticalLine level={level} isChildren={true} />

            <TreeInputField
              showInput={
                showInput.visible &&
                showInput.actionType !== ActionType.RENAME_FOLDER
              }
              level={level}
              isFolder={showInput.isFolder}
              onAddFolder={handleInputSubmit}
              handleBlur={handleBlur}
            />

            {explorer.children?.map((child) => (
              <Tree key={child.id} explorer={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // -----------------------------
  // RENDER FILE
  // -----------------------------
  return (
    <TreeFileRender
      level={level}
      explorer={explorer}
      onAction={handleMenuAction}
      showInput={showInput}
      handleBlur={handleBlur}
      handleInputSubmit={handleInputSubmit}
    />
  );
});

Tree.displayName = "Tree";

export default Tree;
