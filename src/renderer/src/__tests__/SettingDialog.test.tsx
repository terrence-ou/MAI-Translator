import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { act } from "@/utils/test-utils";
import { render, screen } from "@/utils/test-utils";
import { fireEvent } from "@/utils/test-utils";
import Header from "@/components/header/Header";

beforeEach(async () => {
  render(<Header />);
  const settingButton = screen.queryByTestId("button-settings");
  fireEvent.click(settingButton!);
});

describe("Testing dialoging interface", () => {
  test("check texts", () => {
    expect(screen.queryByText("Settings")).toBeVisible();
    expect(screen.queryByText("Interface")).toBeVisible();
    expect(screen.queryByText("Theme")).toBeVisible();
    expect(screen.queryByText("Editor Font Size")).toBeVisible();
    expect(screen.queryByText("px")).toBeVisible();
    expect(screen.queryByText("DeepL")).toBeVisible();
    expect(screen.queryByText("Claude")).toBeVisible();
  });

  test("check interactable elements", () => {
    expect(screen.queryByTestId("dialog-theme")).toBeInTheDocument();
    expect(screen.queryByTestId("dialog-font")).toBeInTheDocument();
    expect(screen.queryByTestId("dialog-save-btn")).toBeInTheDocument();
  });
});

describe("Testing interactions", () => {
  test("click save button", async () => {
    const saveButton = screen.queryByTestId("dialog-save-btn");
    await act(async () => fireEvent.click(saveButton!));
    expect(window.context.writeApis).toHaveBeenCalled();
  });
});
