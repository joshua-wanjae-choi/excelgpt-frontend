import axios from "axios";

export const getGptSession = async () => {
  const url = "https://chat.openai.com/api/auth/session";
  const config = {};
  return await axios.get(url, config);
};
