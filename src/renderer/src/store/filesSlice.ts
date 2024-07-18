import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FileSliceType, Record } from "@shared/types";
import { RootState } from ".";

const saveRecord = createAsyncThunk("files/saveRecord", async (_, { getState }) => {
  const state = getState() as RootState;
  const { toLanguage: to, sourceText: source, results } = state.translationConfig;
  if (results.outputs.length === 0) return;
  const content = {
    from: results.detected_source_language,
    to,
    source,
    translations: results.outputs,
  } as Record;
  console.log(content);
  try {
    // await window.context.writeHistory(content);
    // create some mock delays to avoid saving files too quick
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.log(error);
  }
});

const initialState: FileSliceType = {
  saving: false,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(saveRecord.pending, (state) => {
      state.saving = true;
    });
    builders.addCase(saveRecord.fulfilled, (state) => {
      state.saving = false;
    });
  },
});

export { saveRecord };
export default filesSlice.reducer;
