import MainContentHeader from "@/components/main-content/mainContent.header";
import { MarkdownViewer } from "@/components/markdown-viewer";
import { FILE_CONTENTS } from "@/constants/dummy/content";
import { getContentById } from "@/lib/api/server/node-content-crud-service";
import { get } from "http";

type MainContentPageProps = {
  params: {
    id: string;
  };
};

const MainContent = async ({ params }: MainContentPageProps) => {
  const { id } = await params;
  const noteId = id;

  const data = getContentById(id);

  return (
    <div className="flex-1 bg-background flex flex-col overflow-hidden">
      {data && (
        <>
          <MainContentHeader
            selectedFile={{ id: noteId, name: `Note ${noteId}` }}
            isEditingFile={true}
            showPreview={false}
            // onPreviewToggle={onPreviewToggle}
            // onSave={onSave}
            // onCancel={onCancel}
            // onEditToggle={onEditToggle}
          />

          <div className="flex-1 overflow-auto p-4">
            <MarkdownViewer content={data.content} />
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;
