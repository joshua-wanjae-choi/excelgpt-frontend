import { urlMap } from "@/config/url-map";
import axios from "axios";

export const runQuery = async (data: string) => {
  const url = urlMap("excelgpt.runQuery");
  const config = {
    data: { query: data },
  };
  return await axios.post(url, config);
};
