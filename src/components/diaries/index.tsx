"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { SelectBox } from "../../commons/components/selectbox";
import { SearchBar } from "../../commons/components/searchbar";
import { Button } from "../../commons/components/button";
import { Pagination } from "../../commons/components/pagination";
import {
  EmotionType,
  getEmotionLabel,
  getEmotionImage,
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

  // 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12; // 4열 × 3행 = 12개 아이템

  // Mock 데이터 - 페이지네이션 테스트를 위한 더 많은 데이터 (총 50개)
  const allMockDiaries: DiaryEntry[] = [
    // 1행 1열: 슬퍼요
    {
      id: 1,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
      emotion: EmotionType.SAD,
      image: getEmotionImage(EmotionType.SAD, "medium"),
    },
    // 1행 2열: 놀랐어요
    {
      id: 2,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.SURPRISE,
      image: getEmotionImage(EmotionType.SURPRISE, "medium"),
    },
    // 1행 3열: 화나요
    {
      id: 3,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.ANGRY,
      image: getEmotionImage(EmotionType.ANGRY, "medium"),
    },
    // 1행 4열: 행복해요
    {
      id: 4,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.HAPPY,
      image: getEmotionImage(EmotionType.HAPPY, "medium"),
    },
    // 2행 1열: 기타
    {
      id: 5,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
      emotion: EmotionType.ETC,
      image: getEmotionImage(EmotionType.ETC, "medium"),
    },
    // 2행 2열: 놀랐어요
    {
      id: 6,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.SURPRISE,
      image: getEmotionImage(EmotionType.SURPRISE, "medium"),
    },
    // 2행 3열: 화나요
    {
      id: 7,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.ANGRY,
      image: getEmotionImage(EmotionType.ANGRY, "medium"),
    },
    // 2행 4열: 행복해요
    {
      id: 8,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.HAPPY,
      image: getEmotionImage(EmotionType.HAPPY, "medium"),
    },
    // 3행 1열: 슬퍼요
    {
      id: 9,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다. 한줄까지만 노출 됩니다.",
      emotion: EmotionType.SAD,
      image: getEmotionImage(EmotionType.SAD, "medium"),
    },
    // 3행 2열: 놀랐어요
    {
      id: 10,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.SURPRISE,
      image: getEmotionImage(EmotionType.SURPRISE, "medium"),
    },
    // 3행 3열: 화나요
    {
      id: 11,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.ANGRY,
      image: getEmotionImage(EmotionType.ANGRY, "medium"),
    },
    // 3행 4열: 행복해요
    {
      id: 12,
      date: "2024. 03. 12",
      content: "타이틀 영역 입니다.",
      emotion: EmotionType.HAPPY,
      image: getEmotionImage(EmotionType.HAPPY, "medium"),
    },
  ];

  // 더 많은 Mock 데이터 생성 (페이지네이션 테스트용)
  for (let i = 13; i <= 50; i++) {
    const emotions = Object.values(EmotionType);
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    allMockDiaries.push({
      id: i,
      date: "2024. 03. 12",
      content: `타이틀 영역 입니다. ${i}번째 일기입니다.`,
      emotion: randomEmotion,
      image: getEmotionImage(randomEmotion, "medium"),
    });
  }

  // 페이지네이션 계산
  const totalPages = Math.ceil(allMockDiaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDiaries = allMockDiaries.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            {currentDiaries.map((diary) => (
              <div key={diary.id} className={styles.diaryCard}>
                <div className={styles.cardImage}>
                  <Image
                    src={diary.image}
                    alt={getEmotionLabel(diary.emotion)}
                    width={274}
                    height={208}
                    className={styles.cardImageElement}
                  />
                  <button className={styles.closeButton}>
                    <Image
                      src="/icons/close_outline_light_m.svg"
                      alt="닫기"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div
                      className={styles.cardEmotion}
                      data-emotion={diary.emotion}
                    >
                      {getEmotionLabel(diary.emotion)}
                    </div>
                    <div className={styles.cardDate}>{diary.date}</div>
                  </div>
                  <div className={styles.cardText}>{diary.content}</div>
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
        <div className={styles.paginationContent}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            variant="primary"
            size="medium"
            theme="light"
            className={styles.paginationComponent}
          />
        </div>
      </div>

      {/* Gap 1168 * 40 */}
      <div className={styles.gap40}></div>
    </div>
  );
};

export default DiariesComponent;
