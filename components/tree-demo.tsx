"use client";

import { useState, useRef, useEffect } from "react";
import { TreeView } from "@/components/tree/tree-view";
import { Input } from "@/components/ui/input";
import { MarkdownViewer } from "@/components/markdown-viewer";
import { ThemeToggle } from "@/components/theme-toggle";
import type { TreeNode } from "../type/tree";
import { INITIAL_DATA } from "@/constants/dummy/tree-dummy";

const FILE_CONTENTS: Record<string, string> = {};

export function TreeDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [treeData, setTreeData] = useState<TreeNode[]>(INITIAL_DATA);
  const [selectedFile, setSelectedFile] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isEditingFile, setIsEditingFile] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const resizingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSidebarWidth(70);
      } else if (width >= 768 && width < 1024) {
        setSidebarWidth(280);
      }
    };

    if (isMobile || isTablet) {
      handleResize();
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      resizingRef.current = false;
      document.body.style.cursor = "default";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, isTablet]);

  const handleMouseDown = () => {
    if (isMobile || isTablet) return;
    resizingRef.current = true;
    document.body.style.cursor = "col-resize";
  };

  const handleNodeSelect = (node: TreeNode) => {
    if (node.type === "file") {
      setSelectedFile({ id: node.id, name: node.name });
      setFileContent(FILE_CONTENTS[node.id] || "");
      setIsEditingFile(false);
      setShowPreview(false);
    }
  };

  const handleSaveFile = () => {
    if (selectedFile) {
      FILE_CONTENTS[selectedFile.id] = fileContent;
      setIsEditingFile(false);
    }
  };

  const handleAddRootFolder = () => {
    const newId = `root-folder-${Date.now()}`;
    const newName = "New Folder";
    const newData = [
      ...treeData,
      { id: newId, name: newName, type: "folder" as const, children: [] },
    ];
    setTreeData(newData);
  };

  const handleAddRootFile = () => {
    const newId = `root-file-${Date.now()}`;
    const newName = "New File";
    const newData = [
      ...treeData,
      { id: newId, name: newName, type: "file" as const },
    ];
    setTreeData(newData);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Hidden on mobile unless toggled */}
        {(!isMobile || sidebarOpen) && (
          <div
            style={{
              width: `${sidebarWidth}px`,
            }}
            className={`border-r border-border flex flex-col bg-sidebar transition-transform duration-300 ${
              isMobile ? "fixed inset-y-0 left-0 z-40 max-w-xs" : "relative"
            }`}
          >
            {/* Header */}
            <div className="p-3 md:p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs md:text-sm font-semibold text-sidebar-foreground">
                  Explorer
                </h2>
                <div className="flex gap-1 items-center">
                  <button
                    onClick={handleAddRootFolder}
                    title="Add folder at root"
                    className="p-1 hover:bg-secondary rounded text-xs text-muted-foreground hover:text-foreground"
                  >
                    📁
                  </button>
                  <button
                    onClick={handleAddRootFile}
                    title="Add file at root"
                    className="p-1 hover:bg-secondary rounded text-xs text-muted-foreground hover:text-foreground"
                  >
                    📄
                  </button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <ThemeToggle />
                </div>
              </div>
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-xs bg-input border-border placeholder:text-muted-foreground"
              />
            </div>

            {/* Tree View */}
            <div className="flex-1 overflow-auto">
              <TreeView
                data={treeData}
                searchQuery={searchQuery}
                onDataChange={setTreeData}
                onNodeSelect={handleNodeSelect}
              />
            </div>

            {/* Footer info */}
            {searchQuery && (
              <div className="p-3 border-t border-border text-xs text-muted-foreground bg-secondary/30">
                Searching:{" "}
                <span className="font-mono text-primary">{searchQuery}</span>
              </div>
            )}
          </div>
        )}

        {/* Close sidebar overlay on mobile */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30"
          />
        )}

        {/* Resize Handle - Only show on desktop */}
        {!isMobile && !isTablet && (
          <div
            onMouseDown={handleMouseDown}
            className="w-1 bg-border hover:bg-primary cursor-col-resize transition-colors active:bg-primary/70"
            title="Drag to resize sidebar"
          />
        )}

        {/* Main Editor Area */}
        <div className="flex-1 bg-background flex flex-col overflow-hidden">
          {selectedFile ? (
            <>
              {/* File Header */}
              <div className="border-b border-border p-3 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-card">
                <div className="flex-1 w-full">
                  <h2 className="text-sm md:text-base font-semibold text-foreground truncate">
                    {selectedFile.name}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    File ID: {selectedFile.id}
                  </p>
                </div>
                {/* Edit/Save Buttons */}
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                  {isEditingFile ? (
                    <>
                      {!isMobile && (
                        <button
                          onClick={() => setShowPreview(!showPreview)}
                          className="px-2 md:px-3 py-1 text-xs bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition whitespace-nowrap"
                        >
                          {showPreview ? "Hide" : "Show"} Preview
                        </button>
                      )}
                      <button
                        onClick={handleSaveFile}
                        className="px-2 md:px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition whitespace-nowrap"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingFile(false)}
                        className="px-2 md:px-3 py-1 text-xs bg-secondary text-foreground rounded hover:bg-secondary/80 transition whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditingFile(true)}
                      className="px-2 md:px-3 py-1 text-xs bg-secondary text-foreground rounded hover:bg-secondary/80 transition whitespace-nowrap"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {/* File Content - Edit or View Mode */}
              <div className="flex-1 overflow-auto p-3 md:p-4">
                {isEditingFile ? (
                  <div
                    className={`flex gap-4 h-full ${
                      isMobile ? "flex-col" : "flex-row"
                    }`}
                  >
                    <div
                      className={isMobile || !showPreview ? "w-full" : "w-1/2"}
                    >
                      <textarea
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        className="w-full h-full bg-secondary/50 rounded-lg p-3 md:p-4 border border-border text-xs text-foreground font-mono leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter markdown content..."
                      />
                    </div>
                    {showPreview && !isMobile && (
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
              <div className="text-center space-y-3">
                <p className="text-lg font-semibold">No file selected</p>
                <p className="text-sm">
                  Click on a file in the explorer to view its content
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
