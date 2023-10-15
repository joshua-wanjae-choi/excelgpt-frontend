interface IExcelTable {
  [colKey: string]: string;
}

interface IProductLetters {
  target: string[];
  result: string[];
  numLoop: number;
  prefix?: string;
  lenResult?: number;
}