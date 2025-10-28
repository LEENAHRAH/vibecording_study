import React from "react";
import Image from "next/image";
import { Button } from "@/commons/components/button";
import { EmotionType, getEmotionInfo } from "@/commons/constants/enum";
import styles from "./styles.module.css";

interface DiariesDetailProps {
  className?: string;
}

// Mock 데이터 - enum 타입을 활용한 감정 관련 데이터
const mockDiaryData = {
  id: "1",
  title: "이것은 타이틀 입니다.",
  content:
    "내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다",
  emotion: EmotionType.HAPPY, // enum 타입 활용
  createdAt: "2024. 07. 12",
};

// @01-common.mdc 룰 준수: 독립적인 부품들의 조립 형태로 구현
const DiariesDetail: React.FC<DiariesDetailProps> = ({ className }) => {
  const emotionInfo = getEmotionInfo(mockDiaryData.emotion);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* Gap: 1168 * 64 */}
      <div className={styles.gap64}></div>

      {/* Detail Title: 1168 * 84 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{mockDiaryData.title}</h1>
        </div>
        <div className={styles.emotionAndDate}>
          <div className={styles.emotionSection}>
            <Image
              src={emotionInfo.images.small}
              alt={emotionInfo.label}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span
              className={styles.emotionText}
              style={{ color: emotionInfo.color }}
            >
              {emotionInfo.label}
            </span>
          </div>
          <div className={styles.dateSection}>
            <span className={styles.dateText}>{mockDiaryData.createdAt}</span>
            <span className={styles.createdText}>작성</span>
          </div>
        </div>
      </div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Content: 1168 * 169 */}
      <div className={styles.detailContent}>
        <div className={styles.contentArea}>
          <div className={styles.contentLabel}>내용</div>
          <div className={styles.contentText}>{mockDiaryData.content}</div>
        </div>
        <div className={styles.copySection}>
          <button className={styles.copyButton}>
            <Image
              src="/icons/copy_outline_light_m.svg"
              alt="복사"
              width={24}
              height={24}
            />
            <span className={styles.copyText}>내용 복사</span>
          </button>
        </div>
      </div>

      {/* Gap: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Footer: 1168 * 56 */}
      <div className={styles.detailFooter}>
        <div className={styles.footerButtons}>
          <Button
            variant="secondary"
            size="small"
            theme="light"
            className={styles.editButton}
          >
            수정
          </Button>
          <Button
            variant="secondary"
            size="small"
            theme="light"
            className={styles.deleteButton}
          >
            삭제
          </Button>
        </div>
      </div>

      {/* Gap: 1168 * 40 - Footer 하단 간격 복구 */}
      <div className={styles.gap40}></div>

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
