import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { render, screen, act, fireEvent, within } from "@/utils/test-utils";
import App from "@/App";
import SideBar from "@/components/sidebar/Sidebar";

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
    expect(await screen.findByText(/2024-08-19/i)).toBeVisible();
    expect(await screen.findByText(/2024-09-21/i)).toBeVisible();
    expect(await screen.findByText(/test1/i)).toBeVisible();
    expect(await screen.findByText(/test2/i)).toBeVisible();
    expect((await screen.findAllByText(/from/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/to/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/ZH/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/EN/i)).length).toBeGreaterThan(0);
    expect((await screen.findAllByText(/JA/i)).length).toBeGreaterThan(0);
  });
});

describe("Testing the content modal", () => {
  beforeEach(async () => await renderApp());
  test("modal is invisible", () => {
    const modal = screen.queryByTestId("modal-history-content");
    expect(modal).not.toBeInTheDocument();
  });
});

describe("Testing click on cards", () => {
  beforeEach(async () => {
    await renderApp();
  });
  test("trigger getFileContent Fn", async () => {
    const sidebar = screen.getByTestId("sidebar");
    const buttons = await within(sidebar).findAllByRole("button");
    const cardButton = buttons[1];
    await act(async () => fireEvent.click(cardButton));
    expect(window.context.getFileContent).toHaveBeenCalled();
  });
});
