import React from "react";
import styles from "./styles.module.css";

interface DiariesDetailProps {
  // 추후 props 타입 정의 예정
  className?: string;
}

const DiariesDetail: React.FC<DiariesDetailProps> = () => {
  return (
    <div className={styles.container}>
      {/* Gap: 1168 * 64 */}
      <div className={styles.gap64}></div>

      {/* Detail Title: 1168 * 84 */}
      <div className={styles.detailTitle}></div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Content: 1168 * 169 */}
      <div className={styles.detailContent}></div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Footer: 1168 * 56 */}
      <div className={styles.detailFooter}>
        <div className={styles.footerInfo}></div>
      </div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Retrospect Input: 1168 * 85 */}
      <div className={styles.retrospectInput}>
        <textarea className={styles.textarea} />
      </div>

      {/* Gap: 1168 * 16 */}
      <div className={styles.gap16}></div>

      {/* Retrospect List: 1168 * 72 */}
      <div className={styles.retrospectList}>
        <div className={styles.retrospectItem}></div>
      </div>
    </div>
  );
};

export default DiariesDetail;
