import React from "react";
import { COLOR_STYLES } from "./constants";
import { StyleButton } from "./StyleButton";
import { Tooltip } from "@mui/material";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import { EditorState } from "draft-js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
