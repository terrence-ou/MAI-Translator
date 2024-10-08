import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import ThemeProvider from "@/components/ThemeProvider";
import { store } from "@/store";
import { TooltipProvider } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
};

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <TooltipProvider>{children}</TooltipProvider>
    </ReduxProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: Providers, ...options });

const storeRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: StoreProvider, ...options });

export * from "@testing-library/react";
export * from "@testing-library/dom";
export * from "@/utils/window-apis.mock";
export { customRender as render, storeRender };
