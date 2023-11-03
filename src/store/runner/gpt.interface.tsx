/**
 * * 변수 설명 *
 * onGptProgress
 *  - gpt 프로세스 시작
 * searchTextareaHeight
 *  - 현재 검색 textarea 높이(px)
 * latestGptQueryHeight
 *  - 가장 마지막에 검색한 검색어 Element의 높이(px)
 * defaultSearchTextareaHeight
 *  - 최초 검색 textarea 높이(px)
 * gptAnswer
 *  - GPT 처리 시 상태 메세지
 */
interface IGptState {
  onGptProgress: TOnGptProgress;
  latestGptQuery: string;
  searchTextareaHeight: number;
  latestGptQueryHeight: number;
  defaultSearchTextareaHeight: number;
  gptAnswer: string;
  setOnGptProgress: (onGptProgress: TOnGptProgress) => void;
  setLatestGptQuery: (latestGptQuery: string) => void;
  setSearchTextareaHeight: (searchTextareaHeight: number) => void;
  setLatestGptQueryHeight: (latestGptQueryHeight: number) => void;
  setDefaultSearchTextareaHeight: (defaultSearchTextareaHeight: number) => void;
  setGptAnswer: (gptAnswer: string) => void;
}
