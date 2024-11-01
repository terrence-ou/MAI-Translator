import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { useAppDispatch } from "@/hooks";
import { useEffect } from "react";
import { render, screen, fireEvent, within } from "@/utils/test-utils";
import Header from "@/components/header/Header";
import {
  updateClaudeConfig,
  updateDeepLConfig,
  updateOpenaiConfig,
} from "@/store/translationConfigSlice";

// let deepl, openai, claude;
let deepl: HTMLElement, openai: HTMLElement, claude: HTMLElement;

// Used to change model configs
const HelperComponent = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateDeepLConfig({ model: "pro", key: "appkey" }));
    dispatch(updateClaudeConfig({ model: "claude-3-opus-20240229", key: "appkey" }));
    dispatch(updateOpenaiConfig({ model: "gpt-4-turbo", key: "appkey", voice: "echo" }));
  }, []);
  return <div>{children}</div>;
};

const runPreRender = () =>
  beforeEach(async () => {
    render(<Header />);
    const settingButton = screen.queryByTestId("button-settings");
    fireEvent.click(settingButton!);
    deepl = screen.queryByTestId("ai-settings-deepl") as HTMLElement;
    openai = screen.queryByTestId("ai-settings-openai") as HTMLElement;
    claude = screen.queryByTestId("ai-settings-claude") as HTMLElement;
  });

// Tests
describe("Testing AI setting accordions", () => {
  runPreRender();
  test("check accordion", () => {
    expect(screen.queryByTestId("ai-settings-accordion")).toBeInTheDocument();
    expect(openai).toBeInTheDocument();
    expect(deepl).toBeInTheDocument();
    expect(claude).toBeInTheDocument();
  });

  test("check deepl accordion expansions", () => {
    const expandBtn = within(deepl).getByRole("button");
    expect(expandBtn.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(expandBtn);
    expect(expandBtn.getAttribute("aria-expanded")).toBe("true");
    expect(screen.queryByText("api key")).toBeVisible();
    expect(screen.queryByText("model")).toBeVisible();
  });

  test("check openai accordion expansions", () => {
    const expandBtn = within(openai).getByRole("button");
    expect(expandBtn.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(expandBtn);
    expect(expandBtn.getAttribute("aria-expanded")).toBe("true");
    expect(screen.queryByText("api key")).toBeVisible();
    expect(screen.queryByText("model")).toBeVisible();
    expect(screen.queryByText("voice")).toBeVisible();
  });

  test("check claude accordion expansions", () => {
    const expandBtn = within(claude).getByRole("button");
    expect(expandBtn.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(expandBtn);
    expect(expandBtn.getAttribute("aria-expanded")).toBe("true");
    expect(screen.queryByText("api key")).toBeVisible();
    expect(screen.queryByText("model")).toBeVisible();
  });
});

describe("Testing AI setting interactions", () => {
  runPreRender();
  test("check deepl settings", () => {
    const expandBtn = within(deepl).getByRole("button");
    fireEvent.click(expandBtn);

    const input = within(deepl).getByRole("textbox");
    fireEvent.change(input, { target: { value: "apikey" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("apikey");
    const comboboxes = within(deepl).getAllByRole("combobox");
    expect(comboboxes).toHaveLength(1);
  });

  test("check openai settings", () => {
    const expandBtn = within(openai).getByRole("button");
    fireEvent.click(expandBtn);

    const input = within(openai).getByRole("textbox");
    fireEvent.change(input, { target: { value: "apikey" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("apikey");
    const comboboxes = within(openai).getAllByRole("combobox");
    expect(comboboxes).toHaveLength(2);
  });

  test("check calude settings", () => {
    const expandBtn = within(claude).getByRole("button");
    fireEvent.click(expandBtn);

    const input = within(claude).getByRole("textbox");
    fireEvent.change(input, { target: { value: "apikey" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("apikey");
    const comboboxes = within(claude).getAllByRole("combobox");
    expect(comboboxes).toHaveLength(1);
  });
});

describe("Testing config updates", () => {
  beforeEach(async () => {
    render(
      <HelperComponent>
        <Header />
      </HelperComponent>
    );
    const settingButton = screen.queryByTestId("button-settings");
    fireEvent.click(settingButton!);
    deepl = screen.queryByTestId("ai-settings-deepl") as HTMLElement;
    openai = screen.queryByTestId("ai-settings-openai") as HTMLElement;
    claude = screen.queryByTestId("ai-settings-claude") as HTMLElement;
  });

  test("deepl configs", () => {
    const expandBtn = within(deepl).getByRole("button");
    fireEvent.click(expandBtn);
    const input = within(deepl).getByRole("textbox");
    expect(input).toHaveValue("******");
    expect(within(deepl).getByText("pro")).toBeInTheDocument();
  });

  test("claude configs", () => {
    const expandBtn = within(claude).getByRole("button");
    fireEvent.click(expandBtn);
    const input = within(claude).getByRole("textbox");
    expect(input).toHaveValue("******");
    expect(within(claude).getByText("claude-3-opus-20240229")).toBeInTheDocument();
  });

  test("openai configs", () => {
    const expandBtn = within(openai).getByRole("button");
    fireEvent.click(expandBtn);
    const input = within(openai).getByRole("textbox");
    expect(input).toHaveValue("******");
    expect(within(openai).getByText("gpt-4-turbo")).toBeInTheDocument();
    expect(within(openai).getByText("echo")).toBeInTheDocument();
  });
});
