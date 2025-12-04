// components/EditorArea.tsx
import MainContentHeader from "./mainContent.header";
import { MarkdownViewer } from "./MarkdownViewer";

interface EditorAreaProps {
  selectedFile: any | null;
  fileContent: string;
  isEditingFile: boolean;
  showPreview: boolean;
  onFileContentChange: (content: string) => void;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
  onPreviewToggle: () => void;
}

export function EditorArea({
  selectedFile,
  fileContent,
  isEditingFile,
  showPreview,
  onFileContentChange,
  onEditToggle,
  onSave,
  onCancel,
  onPreviewToggle,
}: EditorAreaProps) {
  if (!selectedFile) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">No file selected</p>
          <p className="text-sm">
            Click on a file in the explorer to view its content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background flex flex-col overflow-hidden">
      {/* File Header */}
      <MainContentHeader
        selectedFile={selectedFile}
        isEditingFile={isEditingFile}
        showPreview={showPreview}
        onPreviewToggle={onPreviewToggle}
        onSave={onSave}
        onCancel={onCancel}
        onEditToggle={onEditToggle}
      />

      {/* File Content - Edit or View Mode */}
      <div className="flex-1 overflow-auto p-4">
        {isEditingFile ? (
          <div className="flex gap-4 h-full">
            <div className={showPreview ? "w-1/2" : "w-full"}>
              <textarea
                value={fileContent}
                onChange={(e) => onFileContentChange(e.target.value)}
                className="w-full h-full bg-secondary/50 rounded-lg p-4 border border-border text-xs text-foreground font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter markdown content..."
              />
            </div>
            {showPreview && (
              <div className="w-1/2 border-l border-border pl-4 overflow-auto">
                <div className="text-xs text-muted-foreground mb-2 font-semibold">
                  Preview
                </div>
                <MarkdownViewer content={fileContent} />
              </div>
            )}
          </div>
        ) : (
          <MarkdownViewer content={fileContent} />
        )}
      </div>
    </div>
  );
}
