import ActionType from "@/constants/action.enum";
import { TreeNode } from "@/type/tree";
import { ChevronRight, Folder as FolderIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ActionsMenu from "./tree.actionsMenu";

interface TreeFolderRenderProps {
  expand: boolean;
  level: number;
  explorer: TreeNode;
  toggleExpand: () => void;
  handleInputSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onAction: (type: ActionType) => void;
  showInput: {
    visible: boolean;
    isFolder: boolean;
    actionType: ActionType | null;
  };
}

const TreeFolderRender = ({
  expand,
  level,
  explorer,
  toggleExpand,
  onAction,
  showInput,
  handleBlur,
  handleInputSubmit,
}: TreeFolderRenderProps) => {
  const paddingLeft = `calc(0.75rem + ${level * 1.25}rem)`;

  return (
    <div
      onClick={toggleExpand}
      className={cn(
        "flex items-center h-8 px-2.5 py-1.5 cursor-pointer transition-colors duration-150 group relative rounded-md mx-1 my-0.5",
        "hover:bg-accent/60 hover:shadow-sm",
        expand && "bg-accent/30"
      )}
      style={{ paddingLeft }}
    >
      <Button
        className="inline-flex items-center justify-center mr-1.5 -ml-1 w-5 h-5 rounded-md"
        aria-label="Expand or Collapse"
        variant="ghost"
        size="sm"
      >
        <ChevronRight
          className={cn(
            "w-3.5 h-3.5 transition-all duration-200 text-muted-foreground",
            expand && "rotate-90 text-foreground"
          )}
        />
      </Button>

      <FolderIcon
        className={cn(
          "w-4 h-4 mr-2 transition-colors duration-200",
          expand ? "text-blue-500" : "text-yellow-600"
        )}
      />

      <span className="truncate text-sm font-medium">
        {showInput.visible &&
        showInput.actionType === ActionType.RENAME_FOLDER ? (
          <Input
            type="text"
            className="h-7 p-1"
            placeholder={"Folder name..."}
            autoFocus
            defaultValue={explorer.name}
            onKeyDown={handleInputSubmit}
            onBlur={handleBlur}
          />
        ) : (
          explorer.name
        )}
      </span>

      <ActionsMenu isFolder={true} onAction={onAction} />
    </div>
  );
};

export default TreeFolderRender;
