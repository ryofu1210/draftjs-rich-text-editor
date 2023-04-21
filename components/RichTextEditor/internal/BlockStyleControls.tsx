import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { EditorState } from "draft-js";
import { Tooltip } from "@mui/material";
import { StyleButton } from "./StyleButton";

export const BLOCK_TYPES = [
  {
    label: (
      <Tooltip title="見出し1" placement="top">
        <span>H1</span>
      </Tooltip>
    ),
    style: "header-one",
  },
  {
    label: (
      <Tooltip title="見出し2" placement="top">
        <span>H2</span>
      </Tooltip>
    ),
    style: "header-two",
  },
  {
    label: (
      <Tooltip title="見出し3" placement="top">
        <span>H3</span>
      </Tooltip>
    ),
    style: "header-three",
  },
  {
    label: (
      <Tooltip
        title={
          <>
            <p>箇条書き</p>
            <p>
              <span>Tab</span>
              でインデントを増やす
            </p>
            <p>
              <span>Shift + Tab</span>
              でインデントを減らす
            </p>
          </>
        }
        placement="top"
      >
        <FormatListBulletedIcon />
      </Tooltip>
    ),
    style: "unordered-list-item",
  },
  {
    label: (
      <Tooltip
        title={
          <>
            <p>順序付きリスト</p>
            <p>
              <span>Tab</span>
              でインデントを増やす
            </p>
            <p>
              <span>Shift + Tab</span>
              でインデントを減らす
            </p>
          </>
        }
        placement="top"
      >
        <FormatListNumberedIcon />
      </Tooltip>
    ),
    style: "ordered-list-item",
  },
  {
    label: (
      <Tooltip title="引用タグ" placement="top">
        <FormatQuoteIcon />
      </Tooltip>
    ),
    style: "blockquote",
  },
];

type BlockStyleControlsProps = {
  editorState: EditorState;
  onToggle: (blockType: string) => void;
};

export const BlockStyleControls = (props: BlockStyleControlsProps) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
