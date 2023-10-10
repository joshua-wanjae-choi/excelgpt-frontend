/**
 * * 변수 설명 *
 * isGptSubmitted
 *  - gpt 검색어 제출 여부
 *  - CLICK 버튼을 누르거나 검색 textarea에서 enter 입력 시 true로 변경
 * searchTextareaHeight
 *  - 현재 검색 textarea 높이(px)
 * latestGptQueryHeight
 *  - 가장 마지막에 검색한 검색어 Element의 높이(px)
 * defaultSearchTextareaHeight
 *  - 최초 검색 textarea 높이(px)
 */
interface IGptState {
  isGptSubmitted: boolean;
  latestGptQuery: string;
  searchTextareaHeight: number;
  latestGptQueryHeight: number;
  defaultSearchTextareaHeight: number;
  setIsGptSubmitted: (isSubmitted: boolean) => void;
  setLatestGptQuery: (latestGptQuery: string) => void;
  setSearchTextareaHeight: (searchTextareaHeight: number) => void;
  setLatestGptQueryHeight: (latestGptQueryHeight: number) => void;
  setDefaultSearchTextareaHeight: (defaultSearchTextareaHeight: number) => void;
}
