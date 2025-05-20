import { createContext, useContext } from "react";
import { defaultTheme } from "./default-theme";

export const ThemeContext = createContext(defaultTheme);

export const useTheme = () => useContext(ThemeContext);
