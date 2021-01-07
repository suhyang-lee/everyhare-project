import dynamic from "next/dynamic";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";

import PropTypes from "prop-types";

const Editor = dynamic(
  async () => {
    const mod = await import("react-draft-wysiwyg");
    return mod.Editor;
  },
  { ssr: false },
);

const EditorWrapper = styled.div`
  .wrapper {
    height: 300px;
    margin-bottom: 8rem;
  }
  .editor {
    height: 100% !important;
    border: 1px solid #f1f1f1 !important;
    padding: 1rem !important;
    border-radius: 2px !important;
  }
`;

const PostEditor = ({ setEditorState }) => {
  return (
    <>
      <EditorWrapper>
        <Editor
          wrapperClassName="wrapper"
          editorClassName="editor"
          toolbarClassName="toolbar"
          toolbar={{
            link: { inDropdown: true },
            history: { inDropdown: false },
          }}
          placeholder="물품에 대한 자세한 설명을 작성 해 주세요."
          localization={{
            locale: "ko",
          }}
          onEditorStateChange={setEditorState}
        />
      </EditorWrapper>
    </>
  );
};

PostEditor.propTypes = {
  setEditorState: PropTypes.func.isRequired,
};

export default PostEditor;
