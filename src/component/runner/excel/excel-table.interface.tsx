interface IExcelTable {
  excelWrapHeight: number;
}

interface ILastCellIndex {
  x: number;
  y: number;
}

interface ISheetData {
  [index: string]: string;
}
