type MainContentHeaderProps = {
  selectedFile: { id: string; name: string };
  isEditingFile: boolean;
  showPreview: boolean;
  // onPreviewToggle: () => void;
  // onSave: () => void;
  // onCancel: () => void;
  // onEditToggle: () => void;
};

const MainContentHeader = ({
  selectedFile,
  isEditingFile = true,
  showPreview,
  // onPreviewToggle,
  // onSave,
  // onCancel,
  // onEditToggle,
}: MainContentHeaderProps) => {
  return (
    <div className="border-b border-border p-4 flex items-center justify-between gap-3 bg-card">
      <div className="flex-1">
        <h2 className="text-base font-semibold text-foreground truncate">
          {selectedFile.name}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          File ID: {selectedFile.id}
        </p>
      </div>
      {/* Edit/Save Buttons */}
      <div className="flex gap-2">
        {isEditingFile ? (
          <>
            <button
              //onClick={onPreviewToggle}
              className="px-3 py-1 text-xs bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition whitespace-nowrap"
            >
              {showPreview ? "Hide" : "Show"} Preview
            </button>
            <button
              //onClick={onSave}
              className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition whitespace-nowrap"
            >
              Save
            </button>
            <button
              //onClick={onCancel}
              className="px-3 py-1 text-xs bg-secondary text-foreground rounded hover:bg-secondary/80 transition whitespace-nowrap"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            // onClick={onEditToggle}
            className="px-3 py-1 text-xs bg-secondary text-foreground rounded hover:bg-secondary/80 transition whitespace-nowrap"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MainContentHeader;
