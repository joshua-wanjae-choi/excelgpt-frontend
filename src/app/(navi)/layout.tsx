import styles from "./navi.module.css";

export default function NvaiLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className={styles["navi-wrapper"]}>
          <div className="d-flex ms-2">
            <strong>EXCELGPT.CLICK</strong>
          </div>
          <div className="d-flex flex-row">
            <div className="d-flex me-2">login</div>
          </div>
        </nav>
      </section>
      <section>
        <div className={styles["contents-wrapper"]}>{children}</div>
      </section>
    </>
  );
}
