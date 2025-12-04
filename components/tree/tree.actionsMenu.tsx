import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActionType from "@/constants/action.enum";
import {
  FileEdit,
  FilePlus,
  FolderPlus,
  MoreVertical,
  Trash,
} from "lucide-react";

interface ActionMenuProps {
  isFolder: boolean;
  onAction: (type: ActionType) => void;
}

const folderItems = [
  {
    type: ActionType.ADD_FOLDER,
    label: "New Folder",
    icon: FolderPlus,
    iconColor: "text-blue-500",
  },
  {
    type: ActionType.ADD_FILE,
    label: "New File",
    icon: FilePlus,
    iconColor: "text-green-500",
  },
  {
    type: ActionType.RENAME_FOLDER,
    label: "Rename",
    icon: FileEdit,
    iconColor: "text-yellow-500",
  },
  {
    type: ActionType.DELETE_FOLDER,
    label: "Delete",
    icon: Trash,
    iconColor: "text-red-500",
    isDanger: true,
  },
];

const fileItems = [
  {
    type: ActionType.ADD_FILE,
    label: "New File",
    icon: FilePlus,
    iconColor: "text-green-500",
  },
  {
    type: ActionType.RENAME_FILE,
    label: "Rename",
    icon: FileEdit,
    iconColor: "text-yellow-500",
  },
  {
    type: ActionType.DELETE_FILE,
    label: "Delete",
    icon: Trash,
    iconColor: "text-red-500",
    isDanger: true,
  },
];

const ActionsMenu = ({ isFolder, onAction }: ActionMenuProps) => {
  const menuItems = isFolder ? folderItems : fileItems;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 h-7 w-7 rounded-md hover:bg-accent/80"
          aria-label="Actions"
          variant="ghost"
          size="sm"
        >
          <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {menuItems.map(({ type, label, icon: Icon, iconColor, isDanger }) => (
          <DropdownMenuItem
            key={type}
            onClick={(e) => {
              e.stopPropagation();
              onAction(type);
            }}
            className={`text-sm gap-2.5 py-2.5 cursor-pointer ${
              isDanger ? "text-red-500" : ""
            }`}
          >
            <Icon className={`w-4 h-4 ${iconColor}`} />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsMenu;
