import { useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useAppSelector((state: RootState) => state.settings.theme);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme!);
  }, [theme]);
  return <>{children}</>;
};

export default ThemeProvider;
