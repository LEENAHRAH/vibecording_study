"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { SelectBox } from "../../commons/components/selectbox";
import { SearchBar } from "../../commons/components/searchbar";
import { Button } from "../../commons/components/button";
import {
  EmotionType,
  getEmotionLabel,
} from "../../commons/constants/enum";
import { URLS } from "../../commons/constants/url";

// Mock 데이터 인터페이스
interface DiaryEntry {
  id: number;
  date: string;
  content: string;
  emotion: EmotionType;
  image: string;
}

const DiariesComponent: React.FC = () => {
  const router = useRouter();

  // 상태 관리 - 타입 안전성 개선
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Mock 데이터 - 감정 enum 활용 (프롬프트 요구사항: /images 경로 사용)
  const mockDiaries: DiaryEntry[] = [
    {
      id: 1,
      date: "2024.10.28",
      content:
        "오늘은 정말 좋은 하루였어요. 친구들과 함께 맛있는 음식을 먹고 즐거운 시간을 보냈습니다.",
      emotion: EmotionType.HAPPY,
      image: "/images/emotion-happy-m.png",
    },
    {
      id: 2,
      date: "2024.10.27",
      content:
        "비가 와서 조금 우울한 기분이었지만, 집에서 따뜻한 차를 마시며 책을 읽었어요.",
      emotion: EmotionType.SAD,
      image: "/images/emotion-sad-m.png",
    },
    {
      id: 3,
      date: "2024.10.26",
      content:
        "회사에서 일이 잘 풀리지 않아서 스트레스를 많이 받았습니다. 화가 많이 났어요.",
      emotion: EmotionType.ANGRY,
      image: "/images/emotion-angry-m.png",
    },
    {
      id: 4,
      date: "2024.10.25",
      content:
        "갑자기 옛 친구에게서 연락이 와서 정말 놀랐어요. 오랜만에 만나기로 했습니다.",
      emotion: EmotionType.SURPRISE,
      image: "/images/emotion-surprise-m.png",
    },
    {
      id: 5,
      date: "2024.10.24",
      content:
        "평범한 하루였지만 나름대로 의미있는 시간을 보냈습니다. 특별할 것 없는 일상이었어요.",
      emotion: EmotionType.ETC,
      image: "/images/emotion-etc-m.png",
    },
    {
      id: 6,
      date: "2024.10.23",
      content:
        "새로운 취미를 시작해서 정말 기뻐요. 앞으로 더 열심히 해보려고 합니다.",
      emotion: EmotionType.HAPPY,
      image: "/images/emotion-happy-m.png",
    },
  ];

  // 필터 옵션 - ENUM 사용
  const filterOptions = [
    { value: "all", label: "전체" },
    { value: EmotionType.HAPPY, label: getEmotionLabel(EmotionType.HAPPY) },
    { value: EmotionType.SAD, label: getEmotionLabel(EmotionType.SAD) },
    { value: EmotionType.ANGRY, label: getEmotionLabel(EmotionType.ANGRY) },
    {
      value: EmotionType.SURPRISE,
      label: getEmotionLabel(EmotionType.SURPRISE),
    },
    { value: EmotionType.ETC, label: getEmotionLabel(EmotionType.ETC) },
  ];

  // 검색 핸들러
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // TODO: 실제 검색 API 호출 로직 구현 예정
  };

  // 필터 변경 핸들러
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    // TODO: 실제 필터링 로직 구현 예정
  };

  // 일기쓰기 버튼 핸들러 - URL 상수 사용
  const handleWriteDiary = () => {
    router.push(URLS.DIARIES.NEW);
  };

  // 플러스 아이콘 컴포넌트
  const PlusIcon = () => (
    <Image
      src="/icons/plus_outline_light_m.svg"
      alt="플러스"
      width={24}
      height={24}
    />
  );

  return (
    <div className={styles.container}>
      {/* Gap 1168 * 32 */}
      <div className={styles.gap32}></div>

      {/* Search 1168 * 48 */}
      <div className={styles.search}>
        <div className={styles.searchContent}>
          <div className={styles.searchGroup}>
            {/* 필터 드롭다운 */}
            <SelectBox
              variant="primary"
              size="medium"
              theme="light"
              options={filterOptions}
              value={selectedFilter}
              onChange={handleFilterChange}
              containerClassName={styles.filterSelect}
            />

            {/* 검색바 */}
            <SearchBar
              variant="primary"
              size="medium"
              theme="light"
              placeholder="검색어를 입력해 주세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
              showSearchIcon={true}
              containerClassName={styles.searchInput}
            />
          </div>

          {/* 일기쓰기 버튼 */}
          <Button
            variant="primary"
            size="medium"
            theme="light"
            icon={<PlusIcon />}
            iconPosition="left"
            onClick={handleWriteDiary}
            className={styles.writeButton}
          >
            일기쓰기
          </Button>
        </div>
      </div>

      {/* Gap 1168 * 42 */}
      <div className={styles.gap42}></div>

      {/* Main 1168 * 936 */}
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.diaryGrid}>
            {mockDiaries.map((diary) => (
              <div key={diary.id} className={styles.diaryCard}>
                <div className={styles.cardImage}>
                  <Image
                    src={diary.image}
                    alt={getEmotionLabel(diary.emotion)}
                    width={48}
                    height={48}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardDate}>{diary.date}</div>
                  <div className={styles.cardText}>{diary.content}</div>
                  <div className={styles.cardEmotion}>
                    {getEmotionLabel(diary.emotion)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gap 1168 * 40 */}
      <div className={styles.gap40}></div>

      {/* Pagination 1168 * 32 */}
      <div className={styles.pagination}>
        <div className={styles.paginationContent}>Pagination Area</div>
      </div>

      {/* Gap 1168 * 40 */}
      <div className={styles.gap40}></div>
    </div>
  );
};

export default DiariesComponent;
