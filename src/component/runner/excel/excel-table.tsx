"use client";
import { useState, useEffect, useRef, use, KeyboardEvent } from "react";
import styles from "./excel-table.module.css";
import jspreadsheet from "jspreadsheet-ce";
import type IJspreadsheet from "jspreadsheet-ce";
import "jspreadsheet-ce/dist/jspreadsheet.css";

interface IJspreadsheetWrapper extends HTMLDivElement {
  jspreadsheet: IJspreadsheet.JSpreadsheet;
}

export const ExcelTable = (props: IExcelTable) => {
  const jRef = useRef<IJspreadsheetWrapper>(null);
  const options: IJspreadsheet.JSpreadsheetOptions = {
    data: [
      [1, 2, 4],
      [3, 6, 9],
    ],
    minDimensions: [20, 40],
    rowResize: true,
    tableOverflow: true,
    tableHeight: "100%",
  };

  useEffect(() => {
    if (jRef.current && !jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
    }
  }, [options]);

  return <div className={`${styles["excel-table-wrapper"]}`} ref={jRef} />;
};
