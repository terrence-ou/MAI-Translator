import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { useEffect } from "react";
import { fireEvent, storeRender as render, screen } from "@/utils/test-utils";
import LanguagesBar from "@/components/main/LanguagesBar";
import { useAppDispatch } from "@/hooks";
import { setFromLanguage, setToLanguage } from "@/store/translationConfigSlice";

// beforeEach(() => {
// });

const HelperComponent = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFromLanguage("zh"));
    dispatch(setToLanguage("es"));
  }, []);
  return <div>{children}</div>;
};

describe("Testing language bar display", () => {
  test("display components", () => {
    render(<LanguagesBar />);
    expect(screen.queryByText(/Detect Language/i)).toBeVisible();
    expect(screen.queryByText(/English/i)).toBeVisible();
    expect(screen.queryByTestId("button-lan-switch")).toBeInTheDocument();
  });

  test("change language", async () => {
    render(
      <HelperComponent>
        <LanguagesBar />
      </HelperComponent>
    );
    expect(screen.queryByText(/中文/i)).toBeVisible();
    expect(screen.queryByText(/Español/i)).toBeVisible();
  });
});

describe("Switch source and target language", () => {
  test("click switch button", () => {
    render(
      <HelperComponent>
        <LanguagesBar />
      </HelperComponent>
    );
    const fromLan = screen.queryByText(/中文/i);
    const toLan = screen.queryByText(/Español/i);
    const switchButton = screen.queryByTestId("button-lan-switch");
    fireEvent.click(switchButton!);
    expect(/Español/i.test(fromLan!.innerHTML)).toBeTruthy();
    expect(/中文/i.test(toLan!.innerHTML)).toBeTruthy();
  });
});
