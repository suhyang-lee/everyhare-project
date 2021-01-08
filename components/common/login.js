import React, { useCallback } from "react";

export const onKakaoTalkLogin = useCallback(() => {
  const currentUrl = document.location.href;
  window.location.href = `http://localhost:3060/auth/kakao?redirect_url=${encodeURIComponent(
    currentUrl,
  )}`;
}, []);

export const onNaverLogin = useCallback(() => {
  const currentUrl = document.location.href;
  window.location.href = `http://localhost:3060/auth/naver?redirect_url=${encodeURIComponent(
    currentUrl,
  )}`;
});
