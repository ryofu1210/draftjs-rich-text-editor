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
import { useDraftjs } from "./hooks";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
// import createInlineToolbarPlugin, {
//   Separator,
// } from "@draft-js-plugins/inline-toolbar";
// import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
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
import editorStyles from "./editorStyle.module.css";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
// Tooltip
import { Tooltip } from "@mui/material";

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
  const { plugins, Toolbar, LinkButton } = useMemo(() => {
    const linkPlugin = createLinkPlugin();
    const staticToolbarPlugin = createToolbarPlugin();
    return {
      plugins: [staticToolbarPlugin, linkPlugin],
      Toolbar: staticToolbarPlugin.Toolbar,
      LinkButton: linkPlugin.LinkButton,
    };
  }, []);

  const {
    editorState,
    setEditorState,
    onBoldClick,
    onItalicClick,
    onUnderlineClick,
    onH1Click,
    onOrderedListClick,
    onUnorderedListClick,
    handleSaveClick,
    handleKeyCommand,
    myKeyBindingFn,
    onRedClick,
    onBlueClick,
    onYellowClick,
    customStyleMap,
    handleDroppedFiles,
    toggleBlockType,
    toggleInlineStyle,
  } = useDraftjs({ rawContentString, onSaveClick });

  // editorのrefオブジェクト
  const editorRef = React.useRef<Editor>(null);

  const focus = () => {
    editorRef.current?.focus();
  };

  return (
    <div style={{}}>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
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
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

type StyleButtonProps = {
  onToggle: (style: string) => void;
  style: string;
  active: boolean;
  label: React.ReactNode;
};

const StyleButton = (props: StyleButtonProps) => {
  const onToggle = (e: any) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = "RichEditor-styleButton";
  if (props.active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
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
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
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
