import { EditorState } from "draft-js";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { Tooltip } from "@mui/material";
import { StyleButton } from "./StyleButton";

export const INLINE_STYLES = [
  {
    label: (
      <Tooltip title="太文字" placement="top">
        <FormatBoldIcon />
      </Tooltip>
    ),
    style: "BOLD",
  },
  {
    label: (
      <Tooltip title="斜体" placement="top">
        <FormatItalicIcon />
      </Tooltip>
    ),
    style: "ITALIC",
  },
  {
    label: (
      <Tooltip title="下線" placement="top">
        <FormatUnderlinedIcon />
      </Tooltip>
    ),
    style: "UNDERLINE",
  },
  {
    label: (
      <Tooltip title="取り消し線" placement="top">
        <StrikethroughSIcon />
      </Tooltip>
    ),
    style: "STRIKETHROUGH",
  },
];

type InlineStyleControlsProps = {
  editorState: EditorState;
  onToggle: (inlineStyle: string) => void;
};

export const InlineStyleControls = (props: InlineStyleControlsProps) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
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
