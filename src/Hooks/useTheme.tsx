// src/CustomHooks/useTheme.ts
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "../context/Theme";

export default function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
