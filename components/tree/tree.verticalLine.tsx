import React from "react";

interface TreeVerticalLineProps {
  level: number;
  isChildren: boolean;
}

const TreeVerticalLine: React.FC<TreeVerticalLineProps> = ({
  level,
  isChildren,
}) => {
  const rem = isChildren ? (level - 1) * 1.25 : level * 1.25;
  const show = isChildren ? level > 0 : true;
  return (
    <>
      {show ? (
        <div
          className="absolute top-0 bottom-0 w-px bg-border/60 dark:bg-border/40"
          style={{
            left: `calc(0.75rem + ${rem}rem + 0.5rem)`,
          }}
        />
      ) : null}
    </>
  );
};

export default TreeVerticalLine;
