import { useBoundStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";

export const Chat = (props: IChatProps) => {
  const chatWrapRef = useRef<HTMLDivElement>(null);
  const latestGptQueryRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<IChat[]>([]);
  const {
    isGptSubmitted,
    latestGptQuery,
    searchTextareaHeight,
    latestGptQueryHeight,
    defaultSearchTextareaHeight,
    setLatestGptQueryHeight,
  } = useBoundStore((state) => ({
    isGptSubmitted: state.isGptSubmitted,
    latestGptQuery: state.latestGptQuery,
    searchTextareaHeight: state.searchTextareaHeight,
    latestGptQueryHeight: state.latestGptQueryHeight,
    defaultSearchTextareaHeight: state.defaultSearchTextareaHeight,
    setLatestGptQueryHeight: state.setLatestGptQueryHeight,
  }));

  useEffect(() => {
    const doneSubmission = !isGptSubmitted;
    if (doneSubmission && latestGptQuery !== "") {
      // 신규 검색문 렌더링
      const newChat = { chatType: "question", contents: latestGptQuery };
      setChats([...chats, newChat]);
    }
  }, [isGptSubmitted, latestGptQuery]);

  useEffect(() => {
    if (
      chatWrapRef &&
      chatWrapRef.current &&
      latestGptQueryRef &&
      latestGptQueryRef.current
    ) {
      // 신규 검색문이 렌더링 된 후, ChatWrap 스크롤을 최하단으로 이동
      chatWrapRef.current.scrollTo(0, chatWrapRef.current.scrollHeight);

      // 신규 검색문이 렌더링 된 후, 신규 검색문 높이 측정
      let height = latestGptQueryRef.current.offsetHeight;
      const maxHeight = props.gptWrapHeight - defaultSearchTextareaHeight;
      if (latestGptQueryRef.current.offsetHeight > maxHeight) {
        height = maxHeight;
      }
      setLatestGptQueryHeight(height);
    }
  }, [chats]);

  useEffect(() => {
    if (searchTextareaHeight > 0 && chatWrapRef && chatWrapRef.current) {
      // ChatWrap 높이 조정
      const height = props.gptWrapHeight - searchTextareaHeight;
      chatWrapRef.current.style.height = `calc(${height}px - 2 * var(--search-textarea-margin-y))`;

      // ChatWrap 스크롤을 최하단으로 이동
      chatWrapRef.current?.scrollTo(0, chatWrapRef.current.scrollHeight);
    }
  }, [props.gptWrapHeight, searchTextareaHeight, latestGptQueryHeight]);

  return (
    <div className={`${styles["chat-wrapper"]}`} ref={chatWrapRef}>
      {chats &&
        chats.map((chat, i) => {
          if (chat.chatType === "question") {
            return (
              <div
                className={`${styles["question-wrapper"]}`}
                key={i}
                ref={i === chats.length - 1 ? latestGptQueryRef : undefined}
              >
                <div
                  className={`${styles["chat-icon"]} ${styles["question-icon"]}`}
                  key={i}
                >
                  ME
                </div>
                <div className={`${styles["question"]} border-radius-all`}>
                  {chat.contents}
                </div>
              </div>
            );
          }

          return (
            <div className={`${styles["answer-wrapper"]}`} key={i}>
              <div className={`${styles["answer"]} border-radius-all`}>
                {chat.contents}
              </div>
              <div
                className={`${styles["chat-icon"]} ${styles["answer-icon"]}`}
              >
                GPT
              </div>
            </div>
          );
        })}
    </div>
  );
};
