export const urlMap = (urlName: string): string => {
  const excelGptApiRootUrl = "http://localhost:8000";
  const urls: IUrls = {
    "excelgpt.uploadFile": `${excelGptApiRootUrl}/file`,
  };

  if (urlName in urls) {
    return urls[urlName];
  }
  return urls[Object.keys(urls)[0]];
};