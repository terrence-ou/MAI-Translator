import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { render, screen, fireEvent, act } from "@/utils/test-utils";
import TranslationInterface from "@/components/main/TranslationInterface";

beforeEach(() => {
  render(<TranslationInterface />);
});

const sourceText1 = "testing source textarea";
const resultText1 = "testing source textarea";

describe("Testing interface components", () => {
  test("check text areas", () => {
    const sourceTextarea: HTMLTextAreaElement = screen.getByTestId("textarea-source");
    const resultTextarea: HTMLTextAreaElement = screen.getByTestId("textarea-result");
    expect(sourceTextarea).toBeInTheDocument();
    expect(resultTextarea).toBeInTheDocument();
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    fireEvent.change(resultTextarea, { target: { value: resultText1 } });
    expect(sourceTextarea.value).toBe(sourceText1);
    // user shouldn't be able to change the result textarea'
    expect(resultTextarea.value).not.toBe(resultText1);
  });

  test("check textarea buttons", () => {
    expect(screen.getByRole("button", { name: "Save Result" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Translate" })).toBeInTheDocument();
    expect(screen.getByTestId("button-erase")).toBeInTheDocument();
    expect(screen.getByTestId("button-copy")).toBeInTheDocument();
  });

  test("check tab buttons", () => {
    const tabs = screen.getByTestId("main-aisources-tab");
    // Here we only check if there are >= 2 tabs, as the number of ai source will change
    // we want to keep them at least two
    expect(tabs.children.length).toBeGreaterThan(1);
  });
});

describe("Testing buttons interactions", () => {
  test("click translate button without input text", async () => {
    const translateButton = screen.getByRole("button", { name: "Translate" });
    await act(async () => fireEvent.click(translateButton));
    expect(window.context.getClaudeResult).not.toHaveBeenCalled();
    expect(window.context.getDeepLFreeResult).not.toHaveBeenCalled();
  });

  test("click translate button with text", async () => {
    const translateButton = screen.getByRole("button", { name: "Translate" });
    const sourceTextarea: HTMLTextAreaElement = screen.getByTestId("textarea-source");
    expect(sourceTextarea).toBeInTheDocument();
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    fireEvent.blur(sourceTextarea);
    await act(async () => fireEvent.click(translateButton));
    expect(window.context.getClaudeResult).toHaveBeenCalled();
    expect(window.context.getDeepLFreeResult).toHaveBeenCalled();
  });

  test("translate button display text change", async () => {
    const translateButton = screen.getByRole("button", { name: "Translate" });
    const sourceTextarea: HTMLTextAreaElement = screen.getByTestId("textarea-source");
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    fireEvent.blur(sourceTextarea);
    fireEvent.click(translateButton);

    await act(async () => {
      fireEvent.click(translateButton);
      expect(screen.queryByText(/Translating/i)).toBeVisible();
    });
    expect(screen.queryByText(/Translate/i)).toBeVisible();
  });

  test("click erase icon button action", () => {
    const eraseButton = screen.getByTestId("button-erase");
    const sourceTextarea: HTMLTextAreaElement = screen.getByTestId("textarea-source");
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    expect(sourceTextarea.value).toBe(sourceText1);
    fireEvent.click(eraseButton);
    expect(sourceTextarea.value).toBe("");
  });

  test("click copy icon button action", async () => {
    const copyButton = screen.getByTestId("button-copy");
    await act(async () => fireEvent.click(copyButton));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
