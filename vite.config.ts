import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA 설정
    VitePWA({
      registerType: "autoUpdate", // PWA 업데이트 자동 적용
      devOptions: {
        enabled: true, // 개발 중에도 PWA 기능 활성화
      },
      manifest: {
        name: "Ending Credit", // 앱의 전체 이름
        short_name: "Ending Credit", // 홈 화면에 표시될 짧은 이름
        description: "유언대용신탁 앱", // 앱 설명
        theme_color: "#4792DC", // 브라우저 툴바 색상
        background_color: "#FFFFFF", // 앱 배경 색상
        display: "standalone", // 브라우저 url표시부분 안보이게
        orientation: "portrait", // 세로 모드 고정
        // scope: "/", // PWA의 범위
        start_url: "/", // 앱의 시작 URL
        icons: [
          {
            src: "icon-192x192.png", // 작은 아이콘
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png", // 큰 아이콘
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
