export const urlMap = (urlName: string): string => {
  const excelGptApiRootUrl = process.env.NEXT_PUBLIC_EXCELGPT_API_URL;
  const urls: IUrls = {
    "excelgpt.uploadFile": `${excelGptApiRootUrl}/file`,
    "excelgpt.runQuery": `${excelGptApiRootUrl}/query`,
  };

  if (urlName in urls) {
    return urls[urlName];
  }
  return urls[Object.keys(urls)[0]];
};
