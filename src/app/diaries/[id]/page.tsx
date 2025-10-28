import React from "react";
import DiariesDetail from "@/components/diaries-detail";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DiaryDetailPageProps {
  // 추후 params 사용 예정
}

const DiaryDetailPage: React.FC<DiaryDetailPageProps> = () => {
  return (
    <div>
      <DiariesDetail />
    </div>
  );
};

export default DiaryDetailPage;
