import "@/utils/window-apis.mock";
import { act } from "react";
import { storeRender } from "@/utils/test-utils";
import { themedMatchMedia } from "@/utils/window-apis.mock";
import { useAppDispatch } from "@/hooks";
import { updateSettings } from "@/store/settingsSlice";
import ThemeProvider from "@/components/ThemeProvider";

const MockComponent = ({ theme }: { theme: "light" | "dark" | "system" }) => {
  const dispatch = useAppDispatch();
  dispatch(updateSettings({ theme }));
  return <div></div>;
};

const renderThemeProvider = async (
  theme: "light" | "dark" | "system",
  matches: boolean = false
) => {
  themedMatchMedia(matches);
  return await act(async () =>
    storeRender(
      <ThemeProvider>
        <MockComponent theme={theme} />
      </ThemeProvider>
    )
  );
};

describe("Testing theme provider", () => {
  test("check system light theme", async () => {
    await renderThemeProvider("system");
    const root = document.documentElement;
    expect(root.className).toBe("light");
  });

  test("check system light theme", async () => {
    await renderThemeProvider("system", true);
    const root = document.documentElement;
    expect(root.className).toBe("dark");
  });

  test("check light theme", async () => {
    await renderThemeProvider("light");
    const root = document.documentElement;
    expect(root.className).toBe("light");
  });

  test("check dark theme", async () => {
    await renderThemeProvider("dark");
    const root = document.documentElement;
    expect(root.className).toBe("dark");
  });
});
