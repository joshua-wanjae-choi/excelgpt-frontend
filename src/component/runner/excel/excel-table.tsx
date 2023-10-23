"use client";
import {
  useState,
  useEffect,
  useRef,
  use,
  KeyboardEvent,
  createElement,
} from "react";
import styles from "./excel-table.module.css";
import jspreadsheet from "jspreadsheet-ce";
import type IJspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";
import { createPortal } from "react-dom";

interface IJspreadsheetWrapper extends HTMLDivElement {
  // single sheet
  jspreadsheet: IJspreadsheet.JSpreadsheet;
  // multiple sheets
  jexcel: IJspreadsheet.JSpreadsheet;
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
        [1, 2, 4],
        [3, 6, 9],
      ],
    },
    {
      ...defaultOption,
      sheetName:
        "sheet2",
      data: [
        [4, 5, 6],
        [7, 8, 9],
      ],
    },
  ];

  const createNewSheet = () => {
    const newSheetOption = {
      ...defaultOption,
      sheetName: "sheet3",
      data: [
        [1, 1, 1],
        [1, 1, 1],
      ],
    };

    if (jRef.current) {
      jspreadsheet.tabs(jRef.current, [newSheetOption]);
    }
  };

  useEffect(() => {
    if (jRef.current && !jRef.current.jexcel) {
      jspreadsheet.tabs(jRef.current, sheetOptions);

      const sheetsElem = jRef.current.querySelector(
        `div.${styles["excel-table-wrapper"]} > div:first-child`
      ) as HTMLElement;

      sheetsElem.classList.add(styles["sheet-navi-wrapper"]);
    }
  }, [sheetOptions]);

  return (
    <>
      <div className={`${styles["sheet-info-wrapper"]}`}>
        <button
          className={`${styles["new-sheet-button"]} jexcel_tab_link`}
          onClick={createNewSheet}
        >
          +
        </button>
      </div>
      <div className={`${styles["excel-table-wrapper"]}`} ref={jRef} />; ;
    </>
  );
};
