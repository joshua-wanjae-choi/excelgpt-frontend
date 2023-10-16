"use client";
import { useState, useEffect, useRef } from "react";
import { Chat } from "@/component/runner/gpt/chat";
import { Search } from "@/component/runner/gpt/search";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { uploadFile } from "@/query/excelgpt/upload-file";
import styles from "./runner.module.css";
import ExcelTable from "@/component/runner/excel/excel-table";

export default function Page() {
  const sheetRef = useRef<HTMLTextAreaElement>(null);
  const gptWrapRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [gptWrapHeight, setGptWrapHeight] = useState(0);
  // const queryClient = new QueryClient();
  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ["uploadFile"],
  //   queryFn: uploadFile,
  // });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    if (gptWrapRef && gptWrapRef.current) {
      setGptWrapHeight(gptWrapRef.current.offsetHeight);
    }
  }, [windowHeight]);

  const mutation = useMutation((data: string) => uploadFile(data));
  const handleSubmit = () => {
    // data 추출
    if (sheetRef.current) {
      console.log("ome in here?");
      mutation.mutate(sheetRef.current.value);
    }
  };


  return (
    <div className="d-flex flex-row">
      <div className={styles["excel-wrapper"]}>hello world
        <ExcelTable />
      </div>
      <div className={styles["gpt-wrapper"]} ref={gptWrapRef}>
        <Chat gptWrapHeight={gptWrapHeight} />
        <Search
          gptWrapHeight={gptWrapHeight}
          upperHandleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
