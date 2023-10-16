import { urlMap } from "@/config/url-map";
import axios from "axios";

export const uploadFile = async (data: string) => {
  const url = urlMap("excelgpt.uploadFile");
  const config = {
    data: data,
  };
  return await axios.post(url, config);
};
