import { EditorState, convertToRaw, ContentState } from "draft-js";
import DraftPasteProcessor from "draft-js/lib/DraftPasteProcessor";
import draftToHtml from "draftjs-to-html";
import { useEffect } from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";

const TextEditor = ({ onTextChanged, state }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (!state) return;
    const processedHTML = DraftPasteProcessor.processHTML(state);
    const contentState = ContentState.createFromBlockArray(processedHTML);
    setEditorState(
      EditorState.moveFocusToEnd(EditorState.createWithContent(contentState))
    );
  }, []);

  const handleKeyCommand = (editorState) => {
    const overview = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onTextChanged(overview);
    setEditorState(editorState);
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={handleKeyCommand}
    />
  );
};

export default TextEditor;
