import React from "react";
import DiariesDetail from "@/components/diaries-detail";

interface DiaryDetailPageProps {
  params: Promise<{ id: string }>;
}

// 정적 생성을 위한 params 생성 함수
export async function generateStaticParams() {
  // 실제 프로젝트에서는 API에서 데이터를 가져와야 합니다
  // 현재는 예시로 1-10까지의 ID를 생성합니다
  const ids = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  return ids.map((id) => ({
    id: id,
  }));
}

const DiaryDetailPage: React.FC<DiaryDetailPageProps> = async ({ params }) => {
  const { id } = await params;

  return (
    <div>
      <DiariesDetail diaryId={id} />
    </div>
  );
};

export default DiaryDetailPage;
