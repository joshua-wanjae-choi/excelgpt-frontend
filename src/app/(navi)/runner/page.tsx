"use client";
import { useState, useEffect, useRef } from "react";
import { Chat } from "@/component/runner/gpt/chat";
import { Search } from "@/component/runner/gpt/search";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { uploadFile } from "@/query/excelgpt/upload-file";
import styles from "./runner.module.css";
import dynamic from "next/dynamic";
const ExcelTable = dynamic(
  () =>
    import("@/component/runner/excel/excel-table").then(
      (module) => module.ExcelTable
    ),
  { ssr: false }
);

export default function Page() {
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
    console.log(
      "gptWrapRef.current.offsetHeight",
      gptWrapRef.current?.offsetHeight
    );
    if (gptWrapRef && gptWrapRef.current) {
      setGptWrapHeight(gptWrapRef.current.offsetHeight);
    }
  }, [windowHeight]);

  useEffect(() => {
    console.log("!@#!@# gptWrapHeight", gptWrapHeight);
  }, [gptWrapHeight]);

  const handleSubmit = () => {
    // data 추출
    console.log("run handleSubmit");
  };

  return (
    <div className="d-flex flex-row">
      <div className={styles["excel-wrapper"]}>
        <ExcelTable excelWrapHeight={gptWrapHeight} />
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
