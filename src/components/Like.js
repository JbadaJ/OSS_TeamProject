import React, { useEffect, useState } from "react";

const BookPage = () => {
  const [books, setBooks] = useState([]); // 책 리스트 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [selectedBook, setSelectedBook] = useState(null); // 선택한 책
  const [newReview, setNewReview] = useState(""); // 새로운 리뷰
  const apiUrl = "https://67582d5860576a194d0f3163.mockapi.io/book"; // MockAPI URL

  // MockAPI에서 책 정보 가져오기
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 모달 열기
  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setNewReview(book.review || "");
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedBook(null);
    setNewReview("");
  };

  // 리뷰 저장
  const handleSaveReview = async () => {
    if (selectedBook) {
      try {
        const updatedBook = { ...selectedBook, review: newReview };
        const response = await fetch(`${apiUrl}/${selectedBook.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
          const updatedBooks = books.map((book) =>
            book.id === selectedBook.id ? updatedBook : book
          );
          setBooks(updatedBooks);
          alert("리뷰가 저장되었습니다.");
          handleCloseModal();
        } else {
          alert("리뷰 저장 실패");
        }
      } catch (error) {
        console.error("Error saving review:", error);
      }
    }
  };

  // 선호작 등록/삭제
  const toggleFavorite = async (book) => {
    try {
      if (book.check) {
        // 선호작 미등록으로 변경 및 MockAPI에서 삭제
        const response = await fetch(`${apiUrl}/${book.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setBooks((prevBooks) =>
            prevBooks.filter((b) => b.id !== book.id)
          );
          alert(`${book.title}이(가) MockAPI에서 삭제되었습니다.`);
        } else {
          alert("MockAPI에서 삭제 실패");
        }
      } else {
        // 선호작 등록
        const updatedBook = { ...book, check: true };
        const response = await fetch(`${apiUrl}/${book.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
          const updatedBooks = books.map((b) =>
            b.id === book.id ? updatedBook : b
          );
          setBooks(updatedBooks);
          alert(`${book.title}이(가) 선호작에 등록되었습니다.`);
        } else {
          alert("선호작 등록 실패");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>로딩 중...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>선호작 모음</h1>
      <div style={styles.bookList}>
        {books.map((book) => (
          <div key={book.id} style={styles.bookCard}>
            <img
              src={book.imageDownloadUrl}
              alt={book.title}
              style={styles.image}
            />
            <div style={styles.info}>
              <h3 style={styles.bookTitle}>{book.title}</h3>

              <p style={styles.review}>{book.review || "리뷰 없음"}</p>
             
              <div
    style={{
        display: "flex", // Flexbox 적용
        alignItems: "center", // 수직 중앙 정렬
        gap: "10px", // 버튼 간격
    }}
>
    <button
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
        }}
        onClick={() => handleOpenModal(book)}
        title="수정하기" // 접근성을 위한 툴팁
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M3 21v-3.75L14.812 5.438l3.75 3.75L6.75 21H3zm19.11-15.89l-2.22 2.22-3.75-3.75 2.22-2.22a1.5 1.5 0 012.12 0l1.63 1.63a1.5 1.5 0 010 2.12z" />
        </svg>
    </button>
    
    <button
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            border: "none",
            borderRadius: "50%",
            backgroundColor: book.check ? "#dc3545" : "#28a745", // 삭제는 빨강, 등록은 초록
            color: "#fff",
            cursor: "pointer",
        }}
        onClick={() => toggleFavorite(book)}
        title={book.check ? "삭제" : "등록"} // 접근성을 위한 툴팁
    >
        {book.check ? (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M3 6h18v2H3V6zm2 3h14l-1 12H6L5 9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2zm4 0v8h2v-8h-2z" />
            </svg>
        ) : (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 2a7 7 0 017 7v4a7 7 0 01-14 0V9a7 7 0 017-7zm0 2a5 5 0 00-5 5v4a5 5 0 0010 0V9a5 5 0 00-5-5zm-1 8v4h2v-4h-2zm0-3h2v2h-2z" />
            </svg>
        )}
    </button>
</div>


            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedBook && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>{selectedBook.title}</h2>
            <textarea
              style={styles.textarea}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="리뷰를 입력하세요..."
            />
            <div style={styles.modalActions}>
              <button style={styles.saveButton} onClick={handleSaveReview}>
                저장
              </button>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      fontSize: "24px",
      marginBottom: "20px",
    },
    bookList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      justifyContent: "center",
    },
    bookCard: {
      display: "flex",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      padding: "10px",
    },
    image: {
      width: "150px",
      height: "auto",
      borderRadius: "5px",
      marginRight: "20px",
    },
    info: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    bookTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    reviewButton: {
      padding: "6px 10px",
      width: "100px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginBottom: "10px",
    },
    favoriteButton: {
      padding: "6px 10px",
      width: "100px",
      backgroundColor: "red",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
    },
    review: {
      fontSize: "24px",
      color: "black",
    },
    check: {
      fontSize: "14px",
      color: "#007bff",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "400px",
      textAlign: "center",
    },
    textarea: {
      width: "100%",
      height: "100px",
      margin: "10px 0",
      padding: "10px",
      fontSize: "14px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    modalActions: {
      display: "flex",
      justifyContent: "space-between",
    },
    saveButton: {
      padding: "8px 12px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    closeButton: {
      padding: "8px 12px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

export default BookPage;
