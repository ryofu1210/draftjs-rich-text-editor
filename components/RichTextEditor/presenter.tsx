import React, { useState, useMemo } from "react";
import {
  // Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  AtomicBlockUtils,
  ContentBlock,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useDraftjs } from "./internal/hooks";
import { COLOR_STYLES } from "./internal/constants";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin, {
  Separator as InlineSeparator,
} from "@draft-js-plugins/inline-toolbar";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import createToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import {
  ItalicButton,
  BoldButton,
  SubButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  createInlineStyleButton,
  createBlockStyleButton,
} from "@draft-js-plugins/buttons";
import createLinkPlugin from "@draft-js-plugins/anchor";
import editorStyles from "./internal/editorStyle.module.css";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// Tooltip
import { Tooltip } from "@mui/material";
import { StyleButton } from "./internal/StyleButton";
import { ColorStyleControls } from "./internal/ColorStyleControls";
import { CustomFontIcon } from "./internal/CustomFontIcon";
import Icon from "@mui/material/Icon";
import createLinkifyPlugin from "@draft-js-plugins/linkify";

/**
 * BlockTypeに割り当てるスタイル（クラス名）を変更する
 */
function customBlockStyleFn(contentBlock: ContentBlock) {
  const type = contentBlock.getType();
  if (type === "blockquote") {
    return "superFancyBlockquote";
  }
  return "";
}

type Props = {
  rawContentString?: string;
  onSaveClick: (rawContentString: any) => void;
};

export const RichTextEditor: React.FC<Props> = ({
  rawContentString,
  onSaveClick,
}) => {
  const { plugins, InlineToolbar } = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const linkifyPlugin = createLinkifyPlugin();
    return {
      plugins: [inlineToolbarPlugin, linkifyPlugin],
      InlineToolbar: inlineToolbarPlugin.InlineToolbar,
    };
  }, []);

  const {
    editorState,
    setEditorState,
    handleSaveClick,
    handleKeyCommand,
    myKeyBindingFn,
    customStyleMap,
    handleDroppedFiles,
    toggleBlockType,
    toggleInlineStyle,
    toggleColorStyle,
  } = useDraftjs({ rawContentString, onSaveClick });

  // editorのrefオブジェクト
  const editorRef = React.useRef<Editor>(null);

  const focus = () => {
    editorRef.current?.focus();
  };

  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
      </div>
      <div className={editorStyles.editor} onClick={focus}>
        <Editor
          editorKey="editor"
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          keyBindingFn={myKeyBindingFn}
          plugins={plugins}
          customStyleMap={customStyleMap}
          blockStyleFn={customBlockStyleFn}
          ref={editorRef}
        />
        <InlineToolbar>
          {() => (
            <>
              <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
              />
              <ColorStyleControls
                editorState={editorState}
                onToggle={toggleColorStyle}
              />
            </>
          )}
        </InlineToolbar>
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

const BLOCK_TYPES = [
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
      <Tooltip title="箇条書き" placement="top">
        <FormatListBulletedIcon />
      </Tooltip>
    ),
    style: "unordered-list-item",
  },
  {
    label: (
      <Tooltip title="順序付きリスト" placement="top">
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

const BlockStyleControls = (props: BlockStyleControlsProps) => {
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

const INLINE_STYLES = [
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

const InlineStyleControls = (props: InlineStyleControlsProps) => {
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

// type EditorContainerProps = {
//   children: React.ReactNode;
//   onClick: () => void;
// };

// const EditorContainer: React.FC<EditorContainerProps> = ({
//   children,
//   onClick,
// }) => {
//   return (
//     <div
//       style={{
//         margin: "10px",
//         border: "1px solid black",
//         minHeight: "200px",
//         width: "800px",
//       }}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// };
