import "@testing-library/jest-dom";
import "@/utils/window-apis.mock";
import { storeRender as render, act, screen, fireEvent } from "@/utils/test-utils";
import HistoryContent from "@/components/sidebar/HistoryContent";
import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks";
import { loadFiles } from "@/store/filesSlice";
import { useEffect } from "react";

const HelperComponent = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFiles());
  }, []);
  return <div>{children}</div>;
};

const renderComponent = async (filename: string) =>
  await act(async () =>
    render(
      <HelperComponent>
        <Dialog open={true}>
          <HistoryContent filename={filename} />
        </Dialog>
      </HelperComponent>
    )
  );

describe("Testing component display with valid/invalid filename", () => {
  test("invalid filename provided", async () => {
    await renderComponent("");
    expect(screen.queryByTestId("modal-history-invalid")).toBeInTheDocument();
    expect(await screen.findByText(/Failed to load the file/i)).toBeVisible();
  });

  test("valid filename provided", async () => {
    await renderComponent("202407290000.txt");
    expect(screen.queryByTestId("modal-history-invalid")).not.toBeInTheDocument();
    expect(screen.queryByTestId("modal-history-content")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });
});

describe("Testing delete button", () => {
  test("valid filename provided", async () => {
    await renderComponent("202407290000.txt");
    const deleteButton = screen.queryByRole("button", { name: /Delete/i });
    await act(() => fireEvent.click(deleteButton!));
    expect(window.context.deleteFile).toHaveBeenCalled();
  });
});
