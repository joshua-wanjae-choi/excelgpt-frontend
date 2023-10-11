"use client";
import { useState, useEffect, useRef } from "react";
import { Chat } from "@/component/runner/chat";
import { Search } from "@/component/runner/search";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getGptSession } from "@/query/gpt";
import styles from "./runner.module.css";

export default function Page() {
  const gptWrapRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [gptWrapHeight, setGptWrapHeight] = useState(0);
  const queryClient = new QueryClient();
  // const { isLoading, isError, data, error } = useQuery({
  //   queryKey: ["getGptSession"],
  //   queryFn: getGptSession,
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

  // useEffect(() => {
  //   console.log('data', data);
  // }, [data]);

  return (
    <div className="d-flex flex-row">
      <div className={styles["excel-wrapper"]}>hello world</div>
      <div className={styles["gpt-wrapper"]} ref={gptWrapRef}>
        <Chat gptWrapHeight={gptWrapHeight} />
        <Search gptWrapHeight={gptWrapHeight} />
        <iframe src="https://chat.openai.com/api/auth/session" />
      </div>
    </div>
  );
}
