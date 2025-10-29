"use client";

import React from "react";
import DiariesNew from "@/components/diaries-new";

const TempPage: React.FC = () => {
  const handleClose = () => {
    console.log("모달 닫기");
  };

  const handleSubmit = (data: {
    emotion: string;
    title: string;
    content: string;
  }) => {
    console.log("일기 등록:", data);
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <DiariesNew onClose={handleClose} onSubmit={handleSubmit} />
    </div>
  );
};

export default TempPage;
