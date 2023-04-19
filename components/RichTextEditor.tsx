import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useDraftjs } from "./hooks";

type Props = {
  rawContentString?: string;
  onSaveClick: (rawContentString: any) => void;
};

export const RichTextEditor: React.FC<Props> = ({
  rawContentString,
  onSaveClick,
}) => {
  const {
    editorState,
    setEditorState,
    editorEnabled,
    onBoldClick,
    onItalicClick,
    onUnderlineClick,
    onOrderedListClick,
    onUnorderedListClick,
    handleSaveClick,
    handleKeyCommand,
  } = useDraftjs({ rawContentString, onSaveClick });

  return (
    <div style={{}}>
      <button onClick={onBoldClick}>Bold</button>
      <button onClick={onItalicClick}>Italic</button>
      <button onClick={onUnderlineClick}>Underline</button>
      <button onClick={onOrderedListClick}>Ordered List</button>
      <button onClick={onUnorderedListClick}>Unordered List</button>
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
          />
        )}
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};
