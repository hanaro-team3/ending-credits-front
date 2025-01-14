import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-text-size-adjust: none;

  }

  html, body {
    height: 100%;
  }

  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    overflow-x: hidden;
    -webkit-tap-highlight-color: transparent;
    position: fixed;
    width: 100%;
  }

  #root {
    height: 100%;
  }

  .mobile-container {
    width: 100%;
    height: 100%;
    padding: 16px;
    margin: 0 auto;
    max-width: 100%;
    touch-action: manipulation;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* 모바일 안전 영역 대응 */
  @supports (padding: max(0px)) {
    .mobile-container {
      padding-left: max(16px, env(safe-area-inset-left));
      padding-right: max(16px, env(safe-area-inset-right));
      padding-bottom: max(16px, env(safe-area-inset-bottom));
      padding-top: max(16px, env(safe-area-inset-top));
    }
  }
`;
