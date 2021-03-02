import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";

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

const PostEditor = ({ setContents, post }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const data = post?.contents || undefined;
    if (data) {
      const blocksFromHTML = convertFromHTML(data);
      if (blocksFromHTML) {
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        );

        setEditorState(EditorState.createWithContent(state));
      }
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  useEffect(() => {
    setContents(editorState);
  }, [editorState]);

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
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </EditorWrapper>
    </>
  );
};

PostEditor.propTypes = {
  getEditorState: PropTypes.func,
};

export default PostEditor;
