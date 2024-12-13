import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // React Router에서 useParams 가져오기
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  image: {
    display: "block",
    margin: "0 auto 20px",
    width: "200px",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "10px",
    fontSize: "14px",
    color: "#555",
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "left",
    padding: "12px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
  },
};

const DetailPage = () => {
  const { isbn } = useParams(); // URL에서 ISBN 가져오기
  const [bookDetail, setBookDetail] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(
          `/openapi/search/bookAndWebtoonList?prvKey=c9c9eeedd12fc5ce4602648e80e4a337&isbn=${isbn}`
        );
        const data = await response.json();

        console.log("상세 정보 응답 데이터:", data);

        if (data?.result?.resultState === "success" && data?.itemList?.length > 0) {
          setBookDetail(data.itemList[0]);
        } else {
          console.error("책 정보를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("상세 정보 요청 중 오류 발생:", error);
      }
    };

    fetchBookDetail();
  }, [isbn]);

  if (!bookDetail) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{bookDetail.title}</h1>
      <img
        src={bookDetail.imageDownloadUrl}
        alt={bookDetail.title}
        style={styles.image}
      />
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.headerCell}>자류유형</td>
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
            <td style={styles.headerCell}>그림작가</td>
            <td style={styles.cell}>{bookDetail.pictrWritrNm || "정보 없음"}</td>
          </tr>
          <tr>
            <td style={styles.headerCell}>글작가</td>
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
            <td style={styles.headerCell}>연령등급</td>
            <td style={styles.cell}>{bookDetail.ageGradCdNm || "정보 없음"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailPage;
