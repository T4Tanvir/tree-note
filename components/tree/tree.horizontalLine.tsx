import React from "react";

interface TreeHorizontalLineProps {
  level: number;
}

const TreeHorizontalLine = ({ level }: TreeHorizontalLineProps) => {
  return (
    <>
      {level > 0 ? (
        <div
          className="absolute top-4 w-3 h-px bg-border/60 dark:bg-border/40"
          style={{
            left: `calc(0.75rem + ${(level - 1) * 1.25}rem + 0.5rem)`,
          }}
        />
      ) : null}
    </>
  );
};

export default TreeHorizontalLine;
