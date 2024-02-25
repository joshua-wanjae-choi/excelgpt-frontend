import { urlMap } from "@/config/url-map";
import axios from "axios";

export const runQuery = async (args: IRunQueryArgs) => {
  const url = urlMap("excelgpt.runQuery");
  const config = {
    data: { query: args.query, base_sheet_name: args.baseSheetName },
  };
  return await axios.post(url, config);
};
