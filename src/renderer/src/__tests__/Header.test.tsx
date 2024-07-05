import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { render, screen } from "@/utils/test-utils";
import { fireEvent } from "@/utils/test-utils";
// import App from "@/App";
import Header from "@/components/header/Header";

describe("Testing header", () => {
  test("check default buttons", () => {
    render(<Header />);
    expect(getCloseBtn()).toBeInTheDocument();
    expect(getOpenBtn()).not.toBeInTheDocument(); // at this point, the open button shouldn't be displayed
  });

  test("toggling panel button", () => {
    render(<Header />);
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

// Helper functions
const getCloseBtn = () => {
  return screen.queryByTestId("button-panel-close");
};
const getOpenBtn = () => {
  return screen.queryByTestId("button-panel-open");
};
