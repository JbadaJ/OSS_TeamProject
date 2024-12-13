import React from "react";

const GuidePage = () => {
  const steps = [
    {
      title: "만화 검색하기",
      description: "검색창에 만화 제목, 작가, 또는 키워드를 입력하여 원하는 만화를 찾아보세요.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 2a8 8 0 105.3 14.7l4 4a1 1 0 001.4-1.4l-4-4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
        </svg>
      ),
    },
    {
      title: "선호작에 등록하기",
      description: "마음에 드는 만화를 선호작에 추가하여 나만의 컬렉션을 만들어보세요.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
    {
      title: "리뷰 작성하기",
      description: "만화에 대한 나만의 의견을 기록하고 다른 사람들과 공유해보세요.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 21v-3.75L14.812 5.438l3.75 3.75L6.75 21H3zm19.11-15.89l-2.22 2.22-3.75-3.75 2.22-2.22a1.5 1.5 0 012.12 0l1.63 1.63a1.5 1.5 0 010 2.12z" />
        </svg>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>사용 방법 안내</h1>
      <div style={styles.cardContainer}>
        {steps.map((step, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.icon}>{step.icon}</div>
            <h2 style={styles.cardTitle}>{step.title}</h2>
            <p style={styles.cardDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  icon: {
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "16px",
    color: "#555",
  },
};

export default GuidePage;
