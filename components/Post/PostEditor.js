import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  async () => {
    const mod = await import("react-draft-wysiwyg");
    return mod.Editor;
  },
  { ssr: false },
);

const htmlToDraft = dynamic(
  async () => {
    const mod = await import("html-to-draftjs");
    return mod.htmlToDraft;
  },
  { ssr: false },
);

const MyBlock = styled.div`
  .wrapper-class {
    width: 100%;
    height: 400px;
    margin-left: -8px;
  }
  .editor {
    height: 300px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 1rem !important;
    border-radius: 2px !important;
  }
`;

const PostEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // html 변환 -> 글 보기 화면에서 사용할 수 있음.
  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent()),
  );

  // editorState에 값 설정
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <MyBlock>
        <Editor
          // 에디터와 툴바 모두에 적용되는 클래스
          wrapperClassName="wrapper-class"
          // 에디터 주변에 적용된 클래스
          editorClassName="editor"
          // 툴바 주위에 적용된 클래스
          toolbarClassName="toolbar-class"
          // 툴바 설정
          toolbar={{
            // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
          }}
          placeholder="내용을 작성해주세요."
          // 한국어 설정
          localization={{
            locale: "ko",
          }}
          // 초기값 설정
          editorState={editorState}
          // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
          onEditorStateChange={onEditorStateChange}
        />
      </MyBlock>
      {/* <IntroduceContent dangerouslySetInnerHTML={{ __html: editorToHtml }} /> */}
    </>
  );
};

export default PostEditor;
