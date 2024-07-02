import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@/utils/matchMedia.mock";
import { render, screen } from "@/utils/test-utils";
import Header from "@/components/header/Header";

describe("Testing header", () => {
  test("check default buttons", () => {
    render(<Header />);
    const panelButtonClose = screen.queryByTestId("button-panel-close");
    const panelButtonOpen = screen.queryByTestId("button-panel-open");
    expect(panelButtonClose).toBeInTheDocument();
    expect(panelButtonOpen).not.toBeInTheDocument(); // at this point, the open button shouldn't be displayed
  });
});
