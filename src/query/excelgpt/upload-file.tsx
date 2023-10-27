import { urlMap } from "@/config/url-map";
import axios from "axios";

export const uploadFile = async (data: ISheetData) => {
  const url = urlMap("excelgpt.uploadFile");
  const config = {
    data: data,
  };
  return await axios.post(url, config);
};
