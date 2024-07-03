import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { render, screen } from "@/utils/test-utils";
import App from "@/App";

describe("Testing main interface", () => {
  test("basic elementd", async () => {
    render(<App />);
    const header = screen.queryByTestId("header");
    const main = screen.queryByTestId("main");
    const panelLeft = screen.queryByTestId("panel-left");
    const panelRight = screen.queryByTestId("panel-right");
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(panelLeft).toBeInTheDocument();
    expect(panelRight).toBeInTheDocument();
  });
});
