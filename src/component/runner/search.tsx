"use client";

import { useEffect, useState } from "react";
import styles from "./search.module.css";

export const Search = () => {
  const [searchTextareaH, setSearchTextareaH] = useState("1px");

  useEffect(() => {
    const searchBtnElem = document.querySelector("#search-btn");
    if (searchBtnElem) {
      resiseH(searchBtnElem as HTMLElement, searchTextareaH);
    }
  }, [searchTextareaH]);

  const resizeSearchTextareaH = (obj: HTMLElement) => {
    resiseH(obj, "1px");

    let searchTextareaH = `${obj.scrollHeight}px`;
    if (obj.scrollHeight > obj.offsetHeight) {
      searchTextareaH = `calc(${obj.scrollHeight}px + 1rem)`;
    }

    setSearchTextareaH(searchTextareaH);
    resiseH(obj, searchTextareaH);
  };

  const resiseH = (obj: HTMLElement, height: string) => {
    if (obj) {
      obj.style.height = height;
    }
  };

  return (
    <div className={`${styles['search-wrapper']}`}>
      <textarea
        className={`border-radius-start ${styles["seach-textarea"]}`}
        autoComplete="off"
        autoFocus
        onKeyDown={(e) => resizeSearchTextareaH(e.target as HTMLElement)}
        onKeyUp={(e) => resizeSearchTextareaH(e.target as HTMLElement)}
        name="afsdf"
        id="search-textarea"
      ></textarea>
      <button
        className={`border-radius-end ${styles["search-submit"]}`}
        type="button"
        id="search-btn"
      >
        클릭
      </button>
    </div>
  );
};
