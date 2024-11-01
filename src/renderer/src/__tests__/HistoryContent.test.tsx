import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { useAppDispatch } from "@/hooks";
import { setCurrFilename, route } from "@/store/settingsSlice";
import { fireEvent, render, screen } from "@/utils/test-utils";
import HistoryContent from "@/components/history/HistoryContent";
import { act, useEffect } from "react";
// import { Dialog } from "@/components/ui/dialog";
// import { loadFiles } from "@/store/filesSlice";

const HelperComponent = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurrFilename("20240819222854.txt"));
    dispatch(route("history"));
  }, []);
  return <div>{children}</div>;
};

beforeEach(async () => {
  await act(async () =>
    render(
      <HelperComponent>
        <HistoryContent />
      </HelperComponent>
    )
  );
});

describe("Testing component UI", () => {
  test("check item display", () => {
    expect(screen.getByText("DeepL")).toBeVisible();
    expect(screen.getByText("OpenAI")).toBeVisible();
    expect(screen.getByText("Claude")).toBeVisible();
    expect(screen.getByText("Delete")).toBeVisible();
    expect(screen.getByText("Date:")).toBeVisible();
    expect(screen.getByText("From:")).toBeVisible();
    expect(screen.getByText("To:")).toBeVisible();
    expect(screen.getByText(/source text/i)).toBeVisible();
    expect(screen.getByText(/mock result/i)).toBeVisible();
  });

  test("check tabs", async () => {
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBeGreaterThanOrEqual(3);
  });
});

describe("Testing delete button", () => {
  test("ensure delete button triggers backend function", () => {
    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);
    expect(window.context.deleteFile).toHaveBeenCalled();
  });
});
