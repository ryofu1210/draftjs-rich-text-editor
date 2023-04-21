import React, { useState } from "react";
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";

type Props = {
  rawContentString?: string;
  onSaveClick?: (rawContentState: any) => void;
};

const colorStyleMap = {
  RED: { color: "#d70910" },
  YELLOW: { color: "#826f06" },
  BLUE: { color: "#1453c6" },
  GRAY: { color: "#6c737b" },
  DEFAULT_COLOR: { color: "#313f4d" },
};

const customStyleMap = {
  ...colorStyleMap,
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
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

  const handleSaveClick = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    // const contentString = JSON.stringify(rawContentState);
    // await savePostToDatabase(null, contentString);
    // createPost(rawContentState);
    console.log("rawContentState", rawContentState);
    onSaveClick && onSaveClick(rawContentState);
  };

  const handleDroppedFiles = (selection: any, files: any) => {
    console.log("handleDroppedFiles", selection, files);
  };

  React.useEffect(() => {
    setEditorEnabled(true);

    if (rawContentString) {
      const parsedRawContentState = JSON.parse(rawContentString);
      const contentState = convertFromRaw(parsedRawContentState);
      console.log("contentState", contentState);
      // const newEditorText = contentStateToText(contentState);
      // const newEditorState = createEditorStateWithText(newEditorText);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
    // eslint-disable-next-line
  }, []);

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleColorStyle = (toggledColor: string) => {
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(editorState, color!);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    setEditorState(nextEditorState);
    // setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  React.useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const rawContentState = convertToRaw(currentContent);
    console.log(rawContentState);
  }, [editorState]);

  const onTab = (e: any) => {
    const newState = RichUtils.onTab(e, editorState, 4);
    setEditorState(newState);
  };

  return {
    editorState,
    setEditorState,
    editorEnabled,
    handleKeyCommand,
    handleSaveClick,
    myKeyBindingFn,
    customStyleMap,
    handleDroppedFiles,
    toggleBlockType,
    toggleInlineStyle,
    toggleColorStyle,
    onTab,
  };
};
