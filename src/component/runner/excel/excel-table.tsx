"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./excel-table.module.css";
import jspreadsheet from "jspreadsheet-ce";
import type IJspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import { createPortal } from "react-dom";

interface IJspreadsheetWrapper extends HTMLDivElement {
  // single sheet
  jspreadsheet: IJspreadsheet.JSpreadsheet;
  // multiple sheets
  jexcel: IJspreadsheet.JSpreadsheet[];
}

export const ExcelTable = (props: IExcelTable) => {
  const jRef = useRef<IJspreadsheetWrapper>(null);
  const defaultOption: IJspreadsheet.JSpreadsheetOptions = {
    about: false,
    fullscreen: false,
    defaultColWidth: 50,
    minDimensions: [20, 40],
    rowResize: true,
    tableOverflow: true,
    tableHeight: "1000px",
    tableWidth: "100%",
  };
  const sheetOptions: IJspreadsheet.TabOptions[] = [
    {
      ...defaultOption,
      sheetName: "sheet1",
      data: [
        [1, 2, 3],
        [5, 6, 7],
      ],
    },
  ];
  const initalLastCellIndex: ILastCellIndex = {
    x: 0,
    y: 0,
  };
  const [lastCellIndexes, setLastCellIndexes] = useState<ILastCellIndex[]>(
    Array(sheetOptions.length).fill(initalLastCellIndex)
  );
  const [newSheetIndex, setNewSheetIndex] = useState<number>(
    sheetOptions.length + 1
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (jRef.current && !jRef.current.jexcel) {
      // 새 스프레드 시트 생성
      jspreadsheet.tabs(jRef.current, sheetOptions);

      // sheet navi 클래스 추가
      const sheetNaviElem = jRef.current.querySelector(
        `div.${styles["excel-table-wrapper"]} > div:first-child`
      ) as HTMLElement;
      sheetNaviElem.classList.add(styles["sheet-navi-wrapper"]);

      setIsLoaded(true);
    }
  }, []);

  /**
   * lastCellIndex 추가
   * @param lastCellIndex: 신규 시트 lastCellIndex
   */
  const appendLastCellIndex = (lastCellIndex: ILastCellIndex) => {
    setLastCellIndexes([...lastCellIndexes, lastCellIndex]);
  };

  /**
   * lastCellIndex 삭제
   * @param index 시트 인덱스
   * @returns bool 성공여부
   */
  const removeLastCellIndex = (index: number) => {
    if (lastCellIndexes[index] === undefined) {
      return false;
    }

    setLastCellIndexes(lastCellIndexes.filter((x, i) => i !== index));
    return true;
  };

  /**
   * lastCellIndex 갱신
   * @param index 시트 인덱스
   * @param lastCellIndex 업데이트 값
   * @returns bool 성공여부
   */
  const updateLastCellIndex = (
    index: number,
    lastCellIndex: ILastCellIndex
  ) => {
    if (lastCellIndexes[index] === undefined) {
      return false;
    }

    setLastCellIndexes(
      lastCellIndexes.map((x, i) => (i === index ? lastCellIndex : x))
    );
    return true;
  };

  /**
   * 새 시트 추가
   */
  const createNewSheet = () => {
    const newSheetOption = {
      ...defaultOption,
      sheetName: `sheet${newSheetIndex}`,
    };

    if (jRef.current) {
      jspreadsheet.tabs(jRef.current, [newSheetOption]);
    }

    // newSheetIndex 갱신
    setNewSheetIndex(newSheetIndex + 1);

    // lastCellIndex 추가
    appendLastCellIndex(initalLastCellIndex);
  };

  /**
   * 시트 링크에 삭제 버튼 추가
   */
  const appendRemoveSheetButtons = () => {
    if (jRef.current) {
      const result = [];
      const tabElems = jRef.current.querySelectorAll(
        `.${styles["sheet-navi-wrapper"]} .jexcel_tab_link[data-spreadsheet]`
      );

      for (const tabElem of tabElems) {
        // 삭제 버튼 생성
        const nodeElem = createPortal(
          <button
            onClick={(e) => {
              const parentElem = (e.target as HTMLElement)
                .parentElement as HTMLElement;
              const index = parentElem.getAttribute("data-spreadsheet");
              if (index) {
                removeSheet(parseInt(index, 10));
              }
            }}
            className={`${styles["sheet-remove-button"]}`}
          >
            X
          </button>,
          tabElem
        );

        result.push(nodeElem);
      }

      return result;
    }
  };

  /**
   * 시트 삭제
   * @param index: 시트 인덱스(data-spreadsheet)
   * @returns
   */
  const removeSheet = (index: number) => {
    if (jRef.current) {
      const tabElems = jRef.current.querySelectorAll(
        `.${styles["sheet-navi-wrapper"]} .jexcel_tab_link[data-spreadsheet]`
      );
      const containerWrapElem = jRef.current.querySelector(
        `div.${styles["excel-table-wrapper"]} > div:last-child`
      ) as HTMLElement;
      const containerElems = containerWrapElem.querySelectorAll(
        "div.jexcel_tab.jexcel_container"
      );
      const isDeleteAllowed =
        jRef.current.jexcel[index] && tabElems[index] && containerElems[index];
      const sameLengths =
        jRef.current.jexcel.length === tabElems.length &&
        jRef.current.jexcel.length === containerElems.length;
      if (!isDeleteAllowed || !sameLengths) {
        alert(`failed to delete ${index} sheet`);
        return;
      }

      // 삭제
      jRef.current.jexcel.splice(index, 1);
      tabElems[index].remove();
      containerElems[index].remove();

      // 인덱스 재조정
      const tabElemsAfterDelete = jRef.current.querySelectorAll(
        `.${styles["sheet-navi-wrapper"]} .jexcel_tab_link[data-spreadsheet]`
      );
      for (const [i, tabElem] of tabElemsAfterDelete.entries()) {
        tabElem.setAttribute("data-spreadsheet", `${i}`);
      }

      // 마지막 남은 시트 삭제 시 신규 sheet 생성
      if (jRef.current.jexcel.length === 0) {
        createNewSheet();
      }

      // 첫번째 시트 선택
      (tabElems[0] as HTMLElement).click();

      // lastCellIndex 삭제
      removeLastCellIndex(index);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          console.log("lastCellIndexes", lastCellIndexes);
        }}
      >
        show me lastCellIndexes
      </button>
      <button
        onClick={() => {
          if (jRef.current) {
            for (const sheet of jRef.current.jexcel) {
              const a = sheet.getJson();
              console.log("a", a);
            }
          }
        }}
      >
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!
      </button>
      <div className={`${styles["sheet-info-wrapper"]}`}>
        <button
          className={`${styles["new-sheet-button"]}`}
          onClick={createNewSheet}
        >
          +
        </button>
      </div>
      <div className={`${styles["excel-table-wrapper"]}`} ref={jRef} />; ;
      {isLoaded && appendRemoveSheetButtons()}
    </>
  );
};
