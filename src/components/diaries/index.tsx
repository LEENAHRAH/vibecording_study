"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { SelectBox } from "../../commons/components/selectbox";
import { SearchBar } from "../../commons/components/searchbar";
import { Button } from "../../commons/components/button";
import { EmotionType, getEmotionLabel } from "../../commons/constants/enum";
import { URLS } from "../../commons/constants/url";

const DiariesComponent: React.FC = () => {
  const router = useRouter();

  // 상태 관리 - 타입 안전성 개선
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        <div className={styles.mainContent}>Main Content Area</div>
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
