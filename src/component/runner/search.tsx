"use client";

import { useEffect, KeyboardEvent, useRef } from "react";
import { useBoundStore } from "@/store";
import styles from "./search.module.css";

export const Search = (props: ISearchProps) => {
  const searchWrapref = useRef<HTMLDivElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  let pxFrom1rem = 16;
  const {
    isGptSubmitted,
    searchTextareaHeight,
    latestGptQueryHeight,
    setIsGptSubmitted,
    setLatestGptQuery,
    setSearchTextareaHeight,
    setDefaultSearchTextareaHeight,
  } = useBoundStore((state) => ({
    isGptSubmitted: state.isGptSubmitted,
    searchTextareaHeight: state.searchTextareaHeight,
    latestGptQueryHeight: state.latestGptQueryHeight,
    setIsGptSubmitted: state.setIsGptSubmitted,
    setLatestGptQuery: state.setLatestGptQuery,
    setSearchTextareaHeight: state.setSearchTextareaHeight,
    setDefaultSearchTextareaHeight: state.setDefaultSearchTextareaHeight,
  }));

  useEffect(() => {
    // 현재 브라우저에서 1rem 당 pixel 값 계산
    pxFrom1rem = parseInt(
      getComputedStyle(document.documentElement).fontSize,
      10
    );

    // 기본 검색창 높이 전역 state 갱신
    if (searchWrapref && searchWrapref.current) {
      setDefaultSearchTextareaHeight(searchWrapref.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (isGptSubmitted) {
      handleSubmit();
      setIsGptSubmitted(false);
    }
  }, [isGptSubmitted]);

  useEffect(() => {
    if (searchTextareaHeight > 0) {
      handleResizeSearch();
    }
  }, [props.gptWrapHeight, searchTextareaHeight]);

  /**
   * Element 높이를 재조정합니다.
   * @param obj
   * @param height
   */
  const resizeHeight = (obj: HTMLElement, height: string) => {
    if (obj) {
      obj.style.height = height;
    }
  };

  /**
   * 검색 textarea 길이를 재조정합니다.
   * 사용자가 text를 개행할 때마다 길이를 1rem 씩 늘립니다.
   * @param obj
   */
  const resizeSearchTextareaHeight = (obj: HTMLElement) => {
    resizeHeight(obj, "var(--search-textarea-height)");

    const noScrollbarClassName = "no-scrollbar";
    let searchTextareaHeight = obj.offsetHeight;
    if (obj.scrollHeight > obj.offsetHeight) {
      searchTextareaHeight = obj.scrollHeight + 1 * pxFrom1rem;
    }

    let height = searchTextareaHeight;
    // 검색창 표시 가능한 최대 높이
    const maxHeight =
      props.gptWrapHeight - latestGptQueryHeight - 1 * pxFrom1rem;
    if (maxHeight > 0 && searchTextareaHeight > maxHeight) {
      height = maxHeight;

      // 스크롤바 보이기
      if (obj.classList.contains(noScrollbarClassName)) {
        obj.classList.remove(noScrollbarClassName);
      }
    }

    setSearchTextareaHeight(height);
    resizeHeight(obj, `${height}px`);
  };

  /**
   * 사용자가 textarea에서 enter 키를 누를 경우 submit 처리
   * @param e
   * @returns
   */
  const handleSearchTextKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key.toLowerCase() === "enter" && !e.shiftKey) {
      e.preventDefault();
      triggerSubmit();
      return;
    }

    resizeSearchTextareaHeight(e.target as HTMLElement);
  };

  /**
   * 검색 textarea 길이가 변경될 때 함께 처리
   */
  const handleResizeSearch = () => {
    // submit 버튼 길이 변경
    if (searchBtnRef && searchBtnRef.current) {
      resizeHeight(searchBtnRef.current, `${searchTextareaHeight}px`);
    }

    // 검색 wrap 길이 변경
    if (searchTextareaHeight > 0 && searchWrapref && searchWrapref.current) {
      const height = searchTextareaHeight;
      resizeHeight(
        searchWrapref.current,
        `calc(${height}px + 2 * var(--search-textarea-margin-y))`
      );
    }
  };

  /**
   * submit 시작
   */
  const triggerSubmit = () => {
    setIsGptSubmitted(true);
  };

  /**
   * submit 처리
   */
  const handleSubmit = () => {
    if (
      textareaRef &&
      textareaRef.current &&
      searchWrapref &&
      searchWrapref.current
    ) {
      // 검색어 전역 state 갱신
      setLatestGptQuery(textareaRef.current.value);

      // 검색어 삭제
      textareaRef.current.value = "";

      // 검색창 크기를 초기상태로 되돌리기
      resizeHeight(
        searchWrapref.current,
        "calc(var(--search-textarea-height) + 2 * var(--search-textarea-margin-y));"
      );
    }
  };

  return (
    <div className={`${styles["search-wrapper"]}`} ref={searchWrapref}>
      <textarea
        className={`border-radius-start no-scrollbar ${styles["seach-textarea"]}`}
        autoComplete="off"
        autoFocus
        onKeyDown={(e) => handleSearchTextKeyDown(e)}
        onKeyUp={(e) => resizeSearchTextareaHeight(e.target as HTMLElement)}
        ref={textareaRef}
      ></textarea>
      <button
        className={`border-radius-end ${styles["search-submit"]}`}
        type="button"
        ref={searchBtnRef}
        onClick={triggerSubmit}
      >
        <span className={`${styles["vertical"]}`}>CLICK</span>
      </button>
    </div>
  );
};
