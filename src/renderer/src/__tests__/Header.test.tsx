import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { render, screen } from "@/utils/test-utils";
import { fireEvent } from "@/utils/test-utils";
import Header from "@/components/header/Header";

beforeEach(() => {
  render(<Header />);
});

describe("Testing panel controls", () => {
  test("check default buttons", () => {
    expect(getCloseBtn()).toBeInTheDocument();
    expect(getOpenBtn()).not.toBeInTheDocument(); // at this point, the open button shouldn't be displayed
  });

  test("toggling panel button", () => {
    const closeBtn = getCloseBtn();
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn!); // if the previous line passed, then there must be a close button here
    expect(getOpenBtn()).toBeInTheDocument();
    expect(getCloseBtn()).not.toBeInTheDocument();

    const openBtn = getOpenBtn();
    fireEvent.click(openBtn!);
    expect(getCloseBtn()).toBeInTheDocument();
    expect(getOpenBtn()).not.toBeInTheDocument();
  });
});

describe("testing setting controls", () => {
  test("check setting button", () => {
    expect(getSettingBtn()).toBeInTheDocument();
  });

  test("check toggling settings window", () => {
    expect(screen.queryByTestId("dialog-window")).not.toBeInTheDocument();
    const settingButton = getSettingBtn();
    fireEvent.click(settingButton!);
    expect(screen.queryByTestId("dialog-window")).toBeInTheDocument();
    fireEvent.click(settingButton!);
    expect(screen.queryByTestId("dialog-window")).not.toBeInTheDocument();
  });
});

// Helper functions
const getCloseBtn = () => {
  return screen.queryByTestId("button-panel-close");
};
const getOpenBtn = () => {
  return screen.queryByTestId("button-panel-open");
};

const getSettingBtn = () => {
  return screen.queryByTestId("button-settings");
};
