import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
export * from "./usePanelControl";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
