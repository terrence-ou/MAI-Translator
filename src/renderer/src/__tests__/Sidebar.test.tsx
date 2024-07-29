import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { render, screen, act, fireEvent } from "@/utils/test-utils";
import App from "@/App";
import SideBar from "@/components/main/Sidebar";

// we need to use act because we have a useEffect running when mounting the app
const renderApp = async () => {
  await act(async () => {
    render(<App />);
  });
};

describe("Testing sidebar display without history", () => {
  test("sidebar display default text", async () => {
    render(<SideBar />);
    expect(await screen.findByText(/No translation history/i)).toBeVisible();
  });
});

describe("Testing sidebar display with histories", () => {
  beforeEach(async () => await renderApp());
  test("sidebar displays dates and history contents", async () => {
    expect(screen.queryByText(/No translation history/i)).not.toBeInTheDocument();
    expect(await screen.findByText(/2024-07-29/i)).toBeVisible();
    expect(await screen.findByText(/2024-07-30/i)).toBeVisible();
    expect((await screen.findAllByText(/from/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/to/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/ZH/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/EN/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/hello world/i)).length).toBeGreaterThan(0);
  });
});

describe("Testing the content modal", () => {
  beforeEach(async () => await renderApp());
  test("modal is invisible", () => {
    const modal = screen.queryByTestId("modal-history-content");
    expect(modal).not.toBeInTheDocument();
  });

  test("file-reading function get triggered and the modal appears", async () => {
    const sidebar = screen.getByTestId("sidebar");
    const button = sidebar.querySelector("button");
    await act(async () => fireEvent.click(button!));
    expect(window.context.getFileContent).toHaveBeenCalled();
    const modal = screen.queryByTestId("modal-history-content");
    expect(modal).toBeInTheDocument();
  });
});
