import "@testing-library/jest-dom";
import { act } from "react";
import { render, screen } from "@/utils/test-utils";
import App from "@/App";

// we need to use act because we have a useEffect running when mounting the app
const renderApp = async () => {
  await act(async () => {
    render(<App />);
  });
};

beforeEach(async () => {
  await renderApp();
});

describe("Testing main interface layout", () => {
  test("basic elements", async () => {
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

describe("Testing initial texts on the interface", () => {
  test("language selector texts", async () => {
    expect(await screen.findByText("English")).toBeVisible();
    expect(await screen.findByText("Detect Language")).toBeVisible();
    expect(screen.queryByText("中文")).toBeNull();
  });
});
