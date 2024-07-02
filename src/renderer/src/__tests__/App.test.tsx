import "@testing-library/dom";
import "@testing-library/jest-dom";
import "@/utils/matchMedia.mock";
import { render, screen } from "@/utils/test-utils";
import App from "@/App";

describe("Testing main interface", () => {
  test("basic elements", async () => {
    render(<App />);
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });
});
