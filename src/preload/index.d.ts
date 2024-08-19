import {
  DeleteFileFn,
  GetDetectionTranslationResultFn,
  GetFileContentFn,
  GetHistoriesFn,
  GetTranslationResultFn,
  ReadAPIsFn,
  WriteAPIsFn,
  WriteHistoryFn,
  TextToSpeechFn,
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
      textToSpeech: TextToSpeechFn;
      // fs
      writeHistory: WriteHistoryFn;
      getHistories: GetHistoriesFn;
      getFileContent: GetFileContentFn;
      deleteFile: DeleteFileFn;
    };
  }
}
