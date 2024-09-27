import {
  DeleteFileFn,
  GetDetectionTranslationResultFn,
  GetFileContentFn,
  GetHistoriesFn,
  GetTranslationResultFn,
  WriteHistoryFn,
  TextToSpeechFn,
  WriteModelConfigsFn,
  ReadModelConfigsFn,
  OnDragStartFn,
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
      writeModelConfigs: WriteModelConfigsFn;
      readModelConfigs: ReadModelConfigsFn;
      writeHistory: WriteHistoryFn;
      getHistories: GetHistoriesFn;
      getFileContent: GetFileContentFn;
      deleteFile: DeleteFileFn;
      onDragStart: OnDragStartFn;
    };
  }
}
