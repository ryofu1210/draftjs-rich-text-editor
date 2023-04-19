import React, { useState, useMemo } from "react";
import {
  // Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useDraftjs } from "./hooks";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";

type Props = {
  rawContentString?: string;
  onSaveClick: (rawContentString: any) => void;
};

// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;
// const plugins = [inlineToolbarPlugin];

export const RichTextEditor: React.FC<Props> = ({
  rawContentString,
  onSaveClick,
}) => {
  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  const {
    editorState,
    setEditorState,
    editorEnabled,
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
  } = useDraftjs({ rawContentString, onSaveClick });

  return (
    <div style={{}}>
      <button onClick={onBoldClick}>Bold</button>
      <button onClick={onItalicClick}>Italic</button>
      <button onClick={onUnderlineClick}>Underline</button>
      <button onClick={onH1Click}>H1</button>
      <button onClick={onOrderedListClick}>Ordered List</button>
      <button onClick={onUnorderedListClick}>Unordered List</button>
      <button onClick={onRedClick}>Red</button>
      <div
        style={{
          margin: "10px",
          border: "1px solid black",
          minHeight: "200px",
          width: "400px",
        }}
      >
        {editorEnabled && (
          <Editor
            editorKey="editor"
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={setEditorState}
            keyBindingFn={myKeyBindingFn}
            plugins={plugins}
          />
        )}
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};
