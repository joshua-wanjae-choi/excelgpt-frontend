'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './excel-table.module.css';
import jspreadsheet from 'jspreadsheet-ce';
import type IJspreadsheet from 'jspreadsheet-ce';
import 'jspreadsheet-ce/dist/jspreadsheet.css';

interface IJspreadsheetWrapper extends HTMLDivElement {
  jspreadsheet: IJspreadsheet.JSpreadsheet;
}

export const ExcelTable = (props: IExcelTable) => {
  const [downedKey, setDownedKey] = useState('none');

  const selectionActive = function (
    instance: HTMLElement,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    origin: any
  ) {
    // 선택한 셀로 스크롤 이동
    if (jRef.current) {
      const elem = jRef.current.querySelector(
        `td[data-x="${x2}"][data-y="${y2}"]`
      );
      if (!elem) {
        return;
      }
      elem.scrollIntoView();
    }
  };

  // 임시
  const handleScroll = () => {
    console.log('handleScroll', downedKey);
    const allowedKeys = [
      'Tab',
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ];
    if (!jRef.current || !allowedKeys.includes(downedKey)) {
      return;
    }

    const rowNum = jRef.current.jspreadsheet.getSelectedRows(true)[0];
    const colNum = jRef.current.jspreadsheet.getSelectedColumns()[0];
    if (!rowNum || !colNum) {
      return;
    }

    const elem = jRef.current.querySelector(
      `td[data-x="${rowNum}"][data-y="${colNum}"]`
    );
    if (!elem) {
      return;
    }

    const elemRect = elem.getBoundingClientRect();
    if (!elemRect) {
      return;
    }
    // 화면에서 2번째 행 미만 윗 키보드를 눌렀으면
    if (downedKey === 'ArrowUp' && colNum > 2 && elemRect.y < 2 * elemRect.height) {
      jRef.current.scrollBy(0, -2 * elemRect.height);
    } else {
      elem.scrollIntoView();
    }
  }

  // 임시
  const upScroll = (e: KeyboardEvent) => {
    setDownedKey(e.key);
  };

  const jRef = useRef<IJspreadsheetWrapper>(null);
  const options: IJspreadsheet.JSpreadsheetOptions = {
    data: [
      [1, 2, 4],
      [3, 6, 9],
    ],
    minDimensions: [10, 10],
    rowResize: true,
    onselection: selectionActive,
  };

  useEffect(() => {
    if (jRef.current && !jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options);
      jRef.current.onkeyup = upScroll;
    }
  }, [options]);

  return <div className={`${styles['excel-table-wrapper']}`} ref={jRef} />;
};
