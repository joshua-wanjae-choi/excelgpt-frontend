"use client";
import { useState, useEffect, useRef, use, KeyboardEvent } from "react";
import styles from "./excel-table.module.css";
import jspreadsheet from "jspreadsheet-ce";
import type IJspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";

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
      sheetName: "sheet2",
      data: [
        [4, 5, 6],
        [7, 8, 9],
      ],
    },
  ];

  useEffect(() => {
    if (jRef.current && !jRef.current.jexcel) {
      jspreadsheet.tabs(jRef.current, sheetOptions);
    }
  }, [sheetOptions]);

  return <div className={`${styles["excel-table-wrapper"]}`} ref={jRef} />;
};
