import React, { useState } from "react";
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { savePostToDatabase } from "./savePostToDatabase";
// import { getPost } from "@/infra/repositories/localstorage/post/getPost";
// import { createPost } from "@/infra/repositories/localstorage/post/createPost";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
type Props = {
  rawContentString?: string;
  onSaveClick?: (rawContentState: any) => void;
};

export const useDraftjs = ({ rawContentString, onSaveClick }: Props) => {
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [editorEnabled, setEditorEnabled] = useState(false);

  const { hasCommandModifier } = KeyBindingUtil;

  const myKeyBindingFn = (e: any) => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): "handled" | "not-handled" => {
    // Comamnd + Sで保存
    if (command === "myeditor-save") {
      handleSaveClick();
      return "handled";
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  /**
   * inlineStyle変更
   */
  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  /**
   * blockType変更
   */
  const onH1Click = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
  };

  /**
   * List
   */
  const onOrderedListClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const onUnorderedListClick = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  /**
   * カラー変更
   */
  const onRedClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "RED"));
  };

  const handleSaveClick = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    // const contentString = JSON.stringify(rawContentState);
    // await savePostToDatabase(null, contentString);
    // createPost(rawContentState);
    console.log("rawContentState", rawContentState);
    onSaveClick && onSaveClick(rawContentState);
  };

  React.useEffect(() => {
    setEditorEnabled(true);

    if (rawContentString) {
      const parsedRawContentState = JSON.parse(rawContentString);
      const contentState = convertFromRaw(parsedRawContentState);
      console.log("contentState", contentState);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, []);

  return {
    editorState,
    setEditorState,
    editorEnabled,
    handleKeyCommand,
    onBoldClick,
    onItalicClick,
    onUnderlineClick,
    onH1Click,
    onOrderedListClick,
    onUnorderedListClick,
    handleSaveClick,
    myKeyBindingFn,
    onRedClick,
  };
};
