import { FileText, FolderIcon } from "lucide-react";
import { Input } from "../ui/input";

interface TreeInputFieldProps {
  showInput: boolean;
  level: number;
  isFolder: boolean;
  onAddFolder?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  defaultValue?: string; // <-- added
}

const TreeInputField = ({
  showInput,
  isFolder,
  level,
  onAddFolder,
  handleBlur,
  defaultValue, // <-- added
}: TreeInputFieldProps) => {
  return (
    <>
      {showInput && (
        <div
          className="flex items-center gap-2 px-3 py-1.5 mx-2 my-1 rounded-md bg-accent border border-border/50 relative z-10"
          style={{
            paddingLeft: `calc(0.75rem + ${(level + 1) * 1.25}rem)`,
          }}
        >
          {isFolder ? (
            <FolderIcon className="w-4 h-4 text-blue-500" />
          ) : (
            <FileText className="w-4 h-4 text-green-500" />
          )}

          <Input
            type="text"
            className="h-7 p-1"
            placeholder={isFolder ? "Folder name..." : "File name..."}
            autoFocus
            defaultValue={defaultValue}
            onKeyDown={onAddFolder}
            onBlur={handleBlur}
          />
        </div>
      )}
    </>
  );
};

export default TreeInputField;
