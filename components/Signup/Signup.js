import React from "react";

import styles from "./signup.module.scss";

const Signup = () => {
  return (
    <div className={styles.joinWrapper}>
      <div className={styles.joinItem}>
        <div className={styles.joinContent}>
          <h4>에브리쉐어 가입하기</h4>
          <p>
            에브리쉐어에서 이제는 새로운 가치를 창출하고 <br />
            물건을 사지말고 대여하며 환경보호에 동참해요!
          </p>
        </div>
        <div className={styles.joinContent}>
          <button>카카오로 신규가입</button>
          <button>네이버로 신규가입</button>
        </div>
      </div>
      <div className={styles.joinItem}>
        <hr /> OR
        <hr />
      </div>
      <div className={styles.joinItem}>
        <form>
          <input type="text" placeholder="사용하실 ID를 입력 해 주세요." />
          <input
            type="password"
            placeholder="패스워드의 조합을 영문 + 숫자 + 특수문자 8~16자리로 입력 해 주세요."
          />
          <input type="password" placeholder="패스워드를 재입력 해 주세요." />
          <input type="text" placeholder="별명을 입력 해 주세요." />
          <input
            type="text"
            placeholder="휴대폰 번호를 '-'표 없이 입력 해 주세요"
          />
        </form>
      </div>
      <p className={styles.joinInfoMessage}>
        ※ 에브리쉐어는 실제로 서비스되고 있지 않습니다. <br />※ 에브리쉐어는
        개인 프로젝트를 위해 만들어진 사이트 입니다.
      </p>
      <button className={styles.joinSubmitBtn}>에브리쉐어 가입하기</button>
    </div>
  );
};

export default Signup;
