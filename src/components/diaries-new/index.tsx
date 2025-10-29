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
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>일기 쓰기</h1>
      </div>

      <div className={styles.gap}></div>

      {/* Emotion Box */}
      <div className={styles.emotionBox}>
        <h2 className={styles.emotionTitle}>오늘 기분은 어땠나요?</h2>
        <div className={styles.emotionRadioGroup}>
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
        <label className={styles.inputLabel}>제목</label>
        <Input
          variant="primary"
          theme="light"
          size="medium"
          placeholder="제목을 입력합니다."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
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
          className="w-[104px]"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="medium"
          onClick={handleSubmit}
          className="w-[104px]"
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;
