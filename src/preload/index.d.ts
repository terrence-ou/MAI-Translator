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
  WriteModelConfigsFn,
  ReadModelConfigsFn,
} from "@shared/types";

declare global {
  interface Window {
    context: {
      // curd
      getDeepLFreeResult: GetDetectionTranslationResultFn;
      getClaudeResult: GetTranslationResultFn;
      getOpenAIResult: GetTranslationResultFn;
      textToSpeech: TextToSpeechFn;
      // fs
      readApis: ReadAPIsFn;
      writeApis: WriteAPIsFn;
      writeModelConfigs: WriteModelConfigsFn;
      readModelConfigs: ReadModelConfigsFn;
      writeHistory: WriteHistoryFn;
      getHistories: GetHistoriesFn;
      getFileContent: GetFileContentFn;
      deleteFile: DeleteFileFn;
    };
  }
}
