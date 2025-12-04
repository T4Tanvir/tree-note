interface ResizeHandleProps {
  onSidebarWidth: (width: number) => void;
  sidebarWidth: number;
}

export function ResizeHandle({
  onSidebarWidth,
  sidebarWidth,
}: ResizeHandleProps) {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth > 220 && newWidth < 600) {
        onSidebarWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className="w-1 bg-border hover:bg-primary cursor-col-resize transition-colors active:bg-primary/70 absolute right-0 top-0 bottom-0"
      title="Drag to resize sidebar"
    />
  );
}
