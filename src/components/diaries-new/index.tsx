"use client";

import React, { useState } from "react";
import { Input } from "@/commons/components/input";
import { Button } from "@/commons/components/button";
import {
  EmotionType,
  emotionConfig,
  allEmotionTypes,
} from "@/commons/constants/enum";
import styles from "./styles.module.css";

export interface DiariesNewProps {
  onClose?: () => void;
  onSubmit?: (data: {
    emotion: EmotionType;
    title: string;
    content: string;
  }) => void;
}

export const DiariesNew: React.FC<DiariesNewProps> = ({
  onClose,
  onSubmit,
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(
    EmotionType.HAPPY
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        emotion: selectedEmotion,
        title,
        content,
      });
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.wrapper} data-testid="diary-new-modal">
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle} data-testid="diary-new-title">일기 쓰기</h1>
      </div>

      <div className={styles.gap}></div>

      {/* Emotion Box */}
      <div className={styles.emotionBox}>
        <h2 className={styles.emotionTitle} data-testid="emotion-question">오늘 기분은 어땠나요?</h2>
        <div className={styles.emotionRadioGroup} data-testid="emotion-radio-group">
          {allEmotionTypes.map((emotionType) => (
            <label key={emotionType} className={styles.emotionRadioLabel}>
              <input
                type="radio"
                name="emotion"
                value={emotionType}
                checked={selectedEmotion === emotionType}
                onChange={(e) =>
                  setSelectedEmotion(e.target.value as EmotionType)
                }
                className={styles.emotionRadioInput}
                data-testid={`emotion-radio-${emotionType.toLowerCase()}`}
              />
              <span className={styles.emotionRadioText}>
                {emotionConfig[emotionType].label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.gap}></div>

      {/* Input Title */}
      <div className={styles.inputTitle}>
        <Input
          variant="primary"
          theme="light"
          size="medium"
          label="제목"
          placeholder="제목을 입력합니다."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.inputWidth}
          data-testid="diary-title-input"
        />
      </div>

      <div className={styles.gapSmall}></div>

      {/* Input Content */}
      <div className={styles.inputContent}>
        <label className={styles.inputLabel}>내용</label>
        <textarea
          placeholder="내용을 입력합니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentTextarea}
          data-testid="diary-content-textarea"
        />
      </div>

      <div className={styles.gap}></div>

      {/* Footer */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          theme="light"
          size="medium"
          onClick={handleClose}
          className={styles.buttonWidth}
          data-testid="diary-close-button"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="medium"
          onClick={handleSubmit}
          className={styles.buttonWidth}
          data-testid="diary-submit-button"
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;
