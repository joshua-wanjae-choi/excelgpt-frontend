"use client";
import { Chat } from "@/component/runner/chat";
import styles from "./runner.module.css";
import { Search } from "@/component/runner/search";

export default function Page() {
  return (
    <div className="d-flex flex-row">
      <div className={styles["excel-wrapper"]}>hello world</div>
      <div className={styles["gpt-wrapper"]}>
        <Chat />
        <Search />
      </div>
    </div>
  );
}
