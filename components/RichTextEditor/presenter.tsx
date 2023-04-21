import React, { useMemo } from "react";
import { ContentBlock } from "draft-js";
import "draft-js/dist/Draft.css";
import { useDraftjs } from "./internal/hooks";
import Editor from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import editorStyles from "./internal/editorStyle.module.css";
import { ColorStyleControls } from "./internal/ColorStyleControls";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import { InlineStyleControls } from "./internal/InlineStyleControls";
import { BlockStyleControls } from "./internal/BlockStyleControls";
import Button from "@mui/material/Button";

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
    toggleBlockType,
    toggleInlineStyle,
    toggleColorStyle,
    onTab,
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
          onTab={onTab}
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
      <Button onClick={handleSaveClick} variant="contained">Save</Button>
    </div>
  );
};
