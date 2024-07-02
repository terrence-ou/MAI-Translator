import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@/utils/matchMedia.mock";
import { render, screen } from "@/utils/test-utils";
import App from "@/App";

describe("Testing main interface", () => {
  test("basic elementd", async () => {
    render(<App />);
    const header = screen.getByTestId("header");
    const panelLeft = screen.getByTestId("panel-left");
    const panelRight = screen.getByTestId("panel-right");
    expect(header).toBeInTheDocument();
    expect(panelLeft).toBeInTheDocument();
    expect(panelRight).toBeInTheDocument();
  });
});
