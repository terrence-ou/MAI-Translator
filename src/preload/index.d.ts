import {
  DeleteFileFn,
  GetDetectionTranslationResultFn,
  GetFileContentFn,
  GetHistoriesFn,
  GetTranslationResultFn,
  ReadAPIsFn,
  WriteAPIsFn,
  writeHistoryFn,
} from "@shared/types";

declare global {
  interface Window {
    context: {
      // curd
      readApis: ReadAPIsFn;
      writeApis: WriteAPIsFn;
      getDeepLFreeResult: GetDetectionTranslationResultFn;
      getClaudeResult: GetTranslationResultFn;
      getOpenAIResult: GetTranslationResultFn;
      // fs
      writeHistory: writeHistoryFn;
      getHistories: GetHistoriesFn;
      getFileContent: GetFileContentFn;
      deleteFile: DeleteFileFn;
    };
  }
}
