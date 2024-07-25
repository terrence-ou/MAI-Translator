import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { render, screen } from "@/utils/test-utils";
import { fireEvent } from "@/utils/test-utils";
import TranslationInterface from "@/components/main/TranslationInterface";

beforeEach(() => {
  render(<TranslationInterface />);
});

const sourceText1 = "testing source textarea";
// const sourceText2 = "测试输入文字";
const resultText1 = "testing source textarea";
// const resuleText2 = "测试输出文字";

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
  test("click translate button", () => {
    // fireEvent.click()
  });
});
