import "@testing-library/dom";
import "@/utils/matchMedia.mock";
import { render } from "@/utils/test-utils";
import App from "@/App";

test("initial test", async () => {
  render(<App />);
});
