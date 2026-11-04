import type { Metadata } from "next";
import "./portal.css";
import "./neon.css";
import "./terrain.css";
import "./immersive.css";
import "./glass-menu.css";
import "./glass-panels.css";
import "./world-geography.css";
import "./glass-library.css";

export const metadata: Metadata = {
  title: "无限世界 · 赛事大厅",
  description: "选手上传一关，所有人连接一个世界。上传、验收、接线和完整旅程，都在这里。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}




