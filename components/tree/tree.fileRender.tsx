import { FileText } from "lucide-react";
import TreeHorizontalLine from "./tree.horizontalLine";
import TreeVerticalLine from "./tree.verticalLine";
import ActionsMenu from "./tree.actionsMenu";
import { cn } from "../../lib/utils";
import { TreeNode } from "@/type/tree";
import ActionType from "@/constants/action.enum";
import { Input } from "../ui/input";
import useTree from "@/hooks/use-tree";
import Link from "next/link";

interface TreeFileRenderProps {
  level: number;
  explorer: TreeNode;
  onAction: (type: ActionType) => void;
  handleInputSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  showInput: {
    visible: boolean;
    isFolder: boolean;
    actionType: ActionType | null;
  };
}
const TreeFileRender = ({
  level,
  explorer,
  onAction,
  showInput,
  handleBlur,
  handleInputSubmit,
}: TreeFileRenderProps) => {
  const paddingLeft = `calc(0.75rem + ${level * 1.25}rem)`;
  const itemClassName = cn(
    "flex items-center h-8 px-2.5 py-1.5 cursor-pointer transition-colors duration-150 group relative rounded-md mx-1 my-0.5",
    "hover:bg-accent/60 hover:shadow-sm"
  );
  return (
    <div className="relative transition-opacity duration-150">
      <TreeVerticalLine level={level} isChildren={true} />
      <TreeHorizontalLine level={level} />

      <div className={itemClassName} style={{ paddingLeft }}>
        <div className="w-5 mr-1.5" /> {/* spacer */}
        <FileText className="w-4 h-4 mr-2 text-gray-500 group-hover:text-blue-400 transition-colors duration-200" />
        <span className="truncate text-sm font-normal group-hover:text-foreground transition-colors duration-200">
          {showInput.visible &&
          showInput.actionType === ActionType.RENAME_FILE ? (
            <Input
              type="text"
              className="h-7 p-1"
              placeholder={"File name..."}
              autoFocus
              defaultValue={explorer.name}
              onKeyDown={handleInputSubmit}
              onBlur={handleBlur}
            />
          ) : (
            <Link href={`/note/${explorer.id}`}>{explorer.name}</Link>
          )}
        </span>
        <ActionsMenu isFolder={false} onAction={onAction} />
      </div>
    </div>
  );
};

export default TreeFileRender;
