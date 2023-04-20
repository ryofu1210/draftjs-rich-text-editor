import React, { useState, useMemo } from "react";
import {
  // Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  AtomicBlockUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useDraftjs } from "./hooks";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/inline-toolbar";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from "@draft-js-plugins/buttons";
import createLinkPlugin from "@draft-js-plugins/anchor";

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
  const { plugins, InlineToolbar, LinkButton } = useMemo(() => {
    const linkPlugin = createLinkPlugin();
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    return {
      plugins: [inlineToolbarPlugin, linkPlugin],
      InlineToolbar: inlineToolbarPlugin.InlineToolbar,
      LinkButton: linkPlugin.LinkButton,
    };
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
    onBlueClick,
    onYellowClick,
    customStyleMap,
    handleDroppedFiles,
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
      <button onClick={onBlueClick}>Blue</button>
      <button onClick={onYellowClick}>Yellow</button>
      <div
        style={{
          margin: "10px",
          border: "1px solid black",
          minHeight: "200px",
          width: "400px",
        }}
      >
        {editorEnabled && (
          <>
            <Editor
              editorKey="editor"
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              onChange={setEditorState}
              keyBindingFn={myKeyBindingFn}
              plugins={plugins}
              customStyleMap={customStyleMap}
            />
            <InlineToolbar>
              {(externalProps) => (
                <>
                  <ItalicButton {...externalProps} />
                  <BoldButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <Separator />
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                </>
              )}
            </InlineToolbar>
          </>
        )}
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};
