import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilePreview, FileSliceType, Record } from "@shared/types";
import { RootState } from ".";
import { BRIEF_DISPLAY_LENGTH } from "@shared/consts";

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
  try {
    const filename: string = await window.context.writeHistory(content);
    // create some mock delays to avoid saving files too quick
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      date: filename.slice(0, 8),
      content: {
        filename: filename,
        from: content.from.toUpperCase(),
        to: content.to.toUpperCase(),
        translations: content.translations,
        brief: content.source!.slice(0, BRIEF_DISPLAY_LENGTH),
      } as Record,
    };
  } catch (error) {
    console.log(error);
  }
  return undefined;
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

const deleteFile = createAsyncThunk("files/deleteFile", async (filename: string) => {
  const response = await window.context.deleteFile(filename);
  return { response, filename };
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
    builders.addCase(
      saveRecord.fulfilled,
      (state, action: PayloadAction<{ date: string; content: Record } | undefined>) => {
        state.saving = false;
        if (action.payload !== undefined) {
          const { date, content } = action.payload;
          if (!(date in state.filePreview)) state.filePreview[date] = [];
          state.filePreview[date].push(content);
        }
      }
    );
    builders.addCase(loadFiles.fulfilled, (state, action: PayloadAction<FilePreview>) => {
      state.filePreview = action.payload;
    });
    builders.addCase(
      deleteFile.fulfilled,
      (state, action: PayloadAction<{ response: boolean; filename: string }>) => {
        if (action.payload && action.payload.response === true) {
          const { filename } = action.payload;
          console.log("delete", filename);
          state.filePreview[filename.slice(0, 8)] = state.filePreview[filename.slice(0, 8)].filter(
            (file) => file.filename !== filename
          );
        }
      }
    );
  },
});

export { saveRecord, loadFiles, deleteFile };
export default filesSlice.reducer;
