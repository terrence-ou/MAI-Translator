import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { storeRender as render, screen, fireEvent, act } from "@/utils/test-utils";
import TranslationInterface from "@/components/main/TranslationInterface";

import { useAppDispatch } from "@/hooks";
import { resetResult } from "@/store/translationConfigSlice";

// This mock component helps clear part of the redux state
const CleanUpComponent = ({ children }) => {
  const dispatch = useAppDispatch();
  dispatch(resetResult());
  return <div>{children}</div>;
};

beforeEach(() => {
  render(
    <CleanUpComponent>
      <TranslationInterface />
    </CleanUpComponent>
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

const sourceText1 = "testing source textarea";
const resultText1 = "testing source textarea";

describe("Testing interface components", () => {
  test("check text areas", () => {
    const { sourceTextarea, resultTextarea } = getComponents();
    expect(sourceTextarea).toBeInTheDocument();
    expect(resultTextarea).toBeInTheDocument();
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    fireEvent.change(resultTextarea, { target: { value: resultText1 } });
    expect(sourceTextarea.value).toBe(sourceText1);
    // user shouldn't be able to change the result textarea'
    expect(resultTextarea.value).not.toBe(resultText1);
  });

  test("check textarea buttons", () => {
    const { saveResultButton, translateButton, eraseButton, copyButton } = getComponents();
    expect(saveResultButton).toBeInTheDocument();
    expect(translateButton).toBeInTheDocument();
    expect(eraseButton).toBeInTheDocument();
    expect(copyButton).toBeInTheDocument();
  });

  test("check tab buttons", () => {
    const { tabs } = getComponents();
    // Here we only check if there are >= 2 tabs, as the number of ai source will change
    // we want to keep them at least two
    expect(tabs.children.length).toBeGreaterThan(1);
  });
});

describe("Testing translation field buttons interactions", () => {
  test("click translate button without input text", async () => {
    const { translateButton } = getComponents();
    await act(async () => fireEvent.click(translateButton));
    expect(window.context.getClaudeResult).not.toHaveBeenCalled();
    expect(window.context.getDeepLFreeResult).not.toHaveBeenCalled();
  });

  test("click translate button with text", async () => {
    const { translateButton, sourceTextarea } = getComponents();
    expect(sourceTextarea).toBeInTheDocument();
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    fireEvent.blur(sourceTextarea);
    await act(async () => fireEvent.click(translateButton));
    expect(window.context.getClaudeResult).toHaveBeenCalled();
    expect(window.context.getDeepLFreeResult).toHaveBeenCalled();
  });

  test("translate button display text change", async () => {
    const { sourceTextarea, resultTextarea, translateButton } = getComponents();
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    fireEvent.blur(sourceTextarea);
    fireEvent.click(translateButton);

    await act(async () => {
      fireEvent.click(translateButton);
      expect(screen.queryByText(/Translating/i)).toBeVisible();
    });
    expect(screen.queryByText(/Translate/i)).toBeVisible();
    expect(resultTextarea.value).toBe("mock result");
  });

  test("click erase icon button action", () => {
    const { sourceTextarea, eraseButton } = getComponents();
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    expect(sourceTextarea.value).toBe(sourceText1);
    fireEvent.click(eraseButton);
    expect(sourceTextarea.value).toBe("");
  });
});

describe("Testing result field button interactions", () => {
  test("click Save Results button without results available", async () => {
    const { saveResultButton } = getComponents();
    fireEvent.click(saveResultButton);
    await act(() => fireEvent.click(saveResultButton));
    expect(window.context.writeHistory).not.toHaveBeenCalled();
  });

  test("translate button display text change", async () => {
    const { sourceTextarea, saveResultButton, translateButton } = getComponents();
    fireEvent.change(sourceTextarea, { target: { value: sourceText1 } });
    fireEvent.blur(sourceTextarea);
    fireEvent.click(translateButton);
    await act(async () => {
      fireEvent.click(translateButton);
    });
    await act(async () => {
      fireEvent.click(saveResultButton);
    });
    expect(window.context.writeHistory).toHaveBeenCalled();
  });

  test("click copy icon button action", async () => {
    const { copyButton } = getComponents();
    await act(async () => fireEvent.click(copyButton));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});

describe("Testing aisource tab buttons interactions", () => {
  test("default active tab", () => {
    const { firstTab, secondTab } = getComponents();
    expect(firstTab.id).toBe("aisource-active");
    expect(secondTab.id).not.toBe("aisource-active");
  });

  test("switch tab", () => {
    const { firstTab, secondTab } = getComponents();
    fireEvent.click(secondTab);
    expect(firstTab.id).not.toBe("aisource-active");
    expect(secondTab.id).toBe("aisource-active");
    fireEvent.click(firstTab);
    expect(firstTab.id).toBe("aisource-active");
    expect(secondTab.id).not.toBe("aisource-active");
  });
});

// Helper function(s)
const getComponents = () => {
  const sourceTextarea: HTMLTextAreaElement = screen.getByTestId("textarea-source");
  const resultTextarea: HTMLTextAreaElement = screen.getByTestId("textarea-result");
  const translateButton = screen.getByTestId("button-translate");
  const saveResultButton = screen.getByTestId("button-save-result");
  const eraseButton = screen.getByTestId("button-erase");
  const copyButton = screen.getByTestId("button-copy");
  const tabs = screen.getByTestId("main-aisources-tab");
  const firstTab = screen.getByTestId("aisource-0");
  const secondTab = screen.getByTestId("aisource-1");
  return {
    sourceTextarea,
    resultTextarea,
    translateButton,
    saveResultButton,
    eraseButton,
    copyButton,
    tabs,
    firstTab,
    secondTab,
  };
};
