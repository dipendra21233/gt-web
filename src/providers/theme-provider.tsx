"use client";
import { theme } from "@/styles/theme";
import { createContext } from "react";
import { ThemeUIProvider } from "theme-ui";

export const ThemeContext = createContext({});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>;
}
