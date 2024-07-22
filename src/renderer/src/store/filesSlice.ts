import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilePreview, FileSliceType, Record } from "@shared/types";
import { RootState } from ".";

const saveRecord = createAsyncThunk("files/saveRecord", async (_, { getState }) => {
  const state = getState() as RootState;
  const { toLanguage: to, sourceText: brief, results } = state.translationConfig;
  if (results.outputs.length === 0) return;
  const content = {
    from: results.detected_source_language,
    to,
    brief,
    translations: results.outputs,
  } as Record;
  try {
    await window.context.writeHistory(content);
    // create some mock delays to avoid saving files too quick
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.log(error);
  }
});

const loadFiles = createAsyncThunk("files/loadFiles", async () => {
  try {
    const filelist = await window.context.getHistories();
    return filelist;
  } catch (error) {
    console.log(error);
  }
  return {};
});

const initialState: FileSliceType = {
  saving: false,
  filePreview: {},
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
    builders.addCase(loadFiles.fulfilled, (state, action: PayloadAction<FilePreview>) => {
      state.filePreview = action.payload;
    });
  },
});

export { saveRecord, loadFiles };
export default filesSlice.reducer;
