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
import { savePostToDatabase } from "./savePostToDatabase";
// import { getPost } from "@/infra/repositories/localstorage/post/getPost";
// import { createPost } from "@/infra/repositories/localstorage/post/createPost";
import { getPost } from "@/infra/repositories/prisma/post/getPost";
import { createPost } from "@/infra/repositories/prisma/post/createPost";

type Props = {
  rawContentString?: string;
  onSaveClick?: (rawContentState: any) => void;
};

export const useDraftjs = ({ rawContentString, onSaveClick }: Props) => {
  const [editorState, setEditorState] = useState(() => {
    if (rawContentString) {
      const parsedRawContentState = JSON.parse(rawContentString);
      const contentState = convertFromRaw(parsedRawContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      return newEditorState;
    } else {
      return EditorState.createEmpty();
    }
  });
  const [editorEnabled, setEditorEnabled] = useState(false);

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): "handled" | "not-handled" => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

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

  const handleSaveClick = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    // const contentString = JSON.stringify(rawContentState);
    // await savePostToDatabase(null, contentString);
    // createPost(rawContentState);
    onSaveClick && onSaveClick(rawContentState);
  };

  React.useEffect(() => {
    setEditorEnabled(true);
  }, []);

  return {
    editorState,
    setEditorState,
    editorEnabled,
    handleKeyCommand,
    onBoldClick,
    onItalicClick,
    onUnderlineClick,
    onOrderedListClick,
    onUnorderedListClick,
    handleSaveClick,
  };
};
