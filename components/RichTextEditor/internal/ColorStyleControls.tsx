import React from "react";
import { StyleButton } from "./StyleButton";
import { EditorState } from "draft-js";
import { SelectChangeEvent } from "@mui/material/Select";
import SquareIcon from "@mui/icons-material/Square";

export const COLOR_STYLES = [
  {
    label: <SquareIcon sx={{ color: "#d70910" }} />,
    style: "RED",
  },
  {
    label: <SquareIcon sx={{ color: "#826f06" }} />,
    style: "YELLOW",
  },
  {
    label: <SquareIcon sx={{ color: "#1453c6" }} />,
    style: "BLUE",
  },
  {
    label: <SquareIcon sx={{ color: "#6c737b" }} />,
    style: "GRAY",
  },
  {
    label: <SquareIcon sx={{ color: "#313f4d" }} />,
    style: "DEFAULT_COLOR",
  },
];

type ColorStyleControlsProps = {
  editorState: EditorState;
  onToggle: (inlineStyle: string) => void;
};

export const ColorStyleControls = (props: ColorStyleControlsProps) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  // open
  // const [open, setOpen] = React.useState(false);
  const handleChange = (event: SelectChangeEvent) => {
    // setOpen(true);
    props.onToggle(event.target.value as string);
  };

  const styles = COLOR_STYLES.map((type) => type.style);
  const activeColorStyle = currentStyle.find(
    (style) => !!style && styles.includes(style)
  );

  return (
    <div className="RichEditor-controls">
      {COLOR_STYLES.map((type) => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
