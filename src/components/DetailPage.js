import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // React Router에서 useParams 가져오기

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  image: {
    display: "block",
    margin: "0 auto 20px",
    width: "250px",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    textAlign: "left",
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "left",
    padding: "12px",
    fontSize: "16px",
    color: "#ffffff",
    backgroundColor: "#007bff",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "10px",
    fontSize: "14px",
    color: "#555",
  },
  loading: {
    textAlign: "center",
    padding: "20px",
    fontSize: "18px",
    color: "#555",
  },
  error: {
    textAlign: "center",
    padding: "20px",
    fontSize: "18px",
    color: "red",
  },
};

const DetailPage = () => {
  const { isbnOrTitle } = useParams(); // URL에서 ISBN 또는 제목 가져오기
  const [bookDetail, setBookDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        // API 호출 URL
        const targetUrl = isbnOrTitle.match(/^\d+$/)
          ? `/openapi/search/bookAndWebtoonList?prvKey=c9c9eeedd12fc5ce4602648e80e4a337&isbn=${isbnOrTitle}`
          : `/openapi/search/bookAndWebtoonList?prvKey=c9c9eeedd12fc5ce4602648e80e4a337&title=${encodeURIComponent(
              isbnOrTitle
            )}`;

        const response = await fetch(targetUrl);
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();

        if (data?.result?.resultState === "success" && data?.itemList?.length > 0) {
          setBookDetail(data.itemList[0]);
        } else {
          setError("책 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetail();
  }, [isbnOrTitle]);

  if (isLoading) {
    return <div style={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{bookDetail.title || "제목 없음"}</h1>
      <img
        src={bookDetail.imageDownloadUrl || "https://via.placeholder.com/250"}
        alt={bookDetail.title || "이미지 없음"}
        style={styles.image}
      />
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.headerCell}>자료 유형</td>
            <td style={styles.cell}>단행본</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>작품명</td>
            <td style={styles.cell}>{bookDetail.prdctNm || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>제목</td>
            <td style={styles.cell}>{bookDetail.title || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>부제목</td>
            <td style={styles.cell}>{bookDetail.subtitl || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>그림 작가</td>
            <td style={styles.cell}>{bookDetail.pictrWritrNm || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>글 작가</td>
            <td style={styles.cell}>{bookDetail.sntncWritrNm || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>장르</td>
            <td style={styles.cell}>{bookDetail.mainGenreCdNm || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>줄거리</td>
            <td style={styles.cell}>{bookDetail.outline || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>ISBN</td>
            <td style={styles.cell}>{bookDetail.isbn || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>출판사</td>
            <td style={styles.cell}>{bookDetail.plscmpnIdNm || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>연령 등급</td>
            <td style={styles.cell}>{bookDetail.ageGradCdNm || "정보 없음"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailPage;
