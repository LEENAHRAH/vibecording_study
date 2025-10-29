"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/commons/components/button";
import { Input } from "@/commons/components/input";
import { EmotionType, getEmotionInfo } from "@/commons/constants/enum";
import styles from "./styles.module.css";

interface DiariesDetailProps {
  className?: string;
  diaryId?: string;
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

// Mock 회고 데이터
const mockRetrospectData = [
  {
    id: "1",
    content:
      "오늘은 정말 좋은 하루였다. 새로운 것을 배우고 성장할 수 있어서 기뻤다.",
    createdAt: "2024. 07. 12",
  },
  {
    id: "2",
    content: "힘든 일이 있었지만 극복할 수 있어서 뿌듯하다.",
    createdAt: "2024. 07. 11",
  },
];

// @01-common.mdc 룰 준수: 독립적인 부품들의 조립 형태로 구현
const DiariesDetail: React.FC<DiariesDetailProps> = ({
  className,
  diaryId,
}) => {
  // diaryId에 따라 다른 데이터를 보여줄 수 있도록 수정
  // 실제 프로젝트에서는 API 호출로 데이터를 가져와야 합니다
  const currentDiaryData = {
    ...mockDiaryData,
    id: diaryId || mockDiaryData.id,
    title: `다이어리 ${diaryId || mockDiaryData.id} - ${mockDiaryData.title}`,
  };

  const emotionInfo = getEmotionInfo(currentDiaryData.emotion);

  // 회고 입력 상태 관리
  const [retrospectInput, setRetrospectInput] = useState("");
  const [retrospectList, setRetrospectList] = useState(mockRetrospectData);

  // 회고 입력 핸들러
  const handleRetrospectSubmit = () => {
    if (retrospectInput.trim()) {
      const newRetrospect = {
        id: Date.now().toString(),
        content: retrospectInput.trim(),
        createdAt: new Date()
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\./g, ". ")
          .replace(/\s+$/, ""),
      };
      setRetrospectList([newRetrospect, ...retrospectList]);
      setRetrospectInput("");
    }
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {/* Gap: 1168 * 64 */}
      <div className={styles.gap64}></div>

      {/* Detail Title: 1168 * 84 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{currentDiaryData.title}</h1>
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
            <span className={styles.dateText}>
              {currentDiaryData.createdAt}
            </span>
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
          <div className={styles.contentText}>{currentDiaryData.content}</div>
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
        <div className={styles.retrospectLabel}>회고</div>
        <div className={styles.retrospectInputRow}>
          <Input
            variant="primary"
            size="medium"
            theme="light"
            placeholder="회고를 남겨보세요."
            value={retrospectInput}
            onChange={(e) => setRetrospectInput(e.target.value)}
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            onClick={handleRetrospectSubmit}
            className={styles.retrospectSubmitButton}
          >
            입력
          </Button>
        </div>
      </div>

      {/* Gap: 1168 * 16 */}
      <div className={styles.gap16}></div>

      {/* Retrospect List: 1168 * 72 */}
      <div className={styles.retrospectList}>
        {retrospectList.map((retrospect, index) => (
          <div key={retrospect.id} className={styles.retrospectItem}>
            <div className={styles.retrospectItemContent}>
              <div className={styles.retrospectContent}>
                {retrospect.content}
              </div>
              <div className={styles.retrospectDate}>
                [{retrospect.createdAt}]
              </div>
            </div>
            {index < retrospectList.length - 1 && (
              <div className={styles.retrospectDivider}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiariesDetail;
