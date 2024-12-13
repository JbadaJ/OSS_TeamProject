import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // React Router에서 Link 가져오기

const BookList = ({ books }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]); // 선호작 상태 저장
  const mockApiUrl = "https://67582d5860576a194d0f3163.mockapi.io/book";

  // MockAPI에서 선호작 가져오기
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(mockApiUrl);
        if (response.ok) {
          const data = await response.json();
          setFavoriteBooks(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleAddToFavorites = async (book) => {
    const isFavorite = favoriteBooks.some((fav) => fav.isbn === book.isbn);

    if (isFavorite) {
      // 이미 선호작에 있는 경우 제거
      try {
        const favorite = favoriteBooks.find((fav) => fav.isbn === book.isbn);
        await fetch(`${mockApiUrl}/${favorite.id}`, {
          method: "DELETE",
        });
        setFavoriteBooks((prevFavorites) =>
          prevFavorites.filter((fav) => fav.isbn !== book.isbn)
        );
        alert(`${book.prdctNm}이(가) 선호작에서 제거되었습니다.`);
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    } else {
      // 선호작에 추가
      try {
        const newFavorite = {
          title: book.prdctNm,
          imageDownloadUrl: book.imageDownloadUrl,
          review: "",
          check: true,
          isbn: book.isbn,
        };

        const response = await fetch(mockApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFavorite),
        });
        if (response.ok) {
          const savedBook = await response.json();
          setFavoriteBooks((prevFavorites) => [...prevFavorites, savedBook]);
          alert(`${book.prdctNm}이(가) 선호작에 추가되었습니다.`);
        } else {
          console.error("Failed to add favorite");
        }
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    }
  };

  const isFavorite = (isbn) => {
    return favoriteBooks.some((fav) => fav.isbn === isbn);
  };

  return (
    <div style={styles.container}>
      {books.map((book, index) => (
        <div key={index} style={styles.card}>
          <img src={book.imageDownloadUrl} alt={book.title} style={styles.image} />
          <h3 style={styles.title}>{book.prdctNm}</h3>
          <p style={styles.author}>
            대표(그림)작가: {book.pictrWritrNm || "정보 없음"}
            <br />
            대표(글)작가: {book.sntncWrtrNm || "정보 없음"}
          </p>
          
          <div style={styles.actions}>
            <Link to={`/detail/${book.isbn}`} style={styles.link}>
              상세 보기
            </Link>
            <button
              onClick={() => handleAddToFavorites(book)}
              style={styles.favoriteButton}
            >
              {isFavorite(book.isbn) ? "⭐" : "❤️"}
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "16px",
    padding: "16px",
  },
  card: {
    width: "200px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "300px",
  },
  title: {
    fontSize: "16px",
    margin: "8px 0",
  },
  author: {
    fontSize: "13px",
    color: "#555",
    padding: "3px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    padding: "6px 12px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#007bff",
    textDecoration: "none",
    borderRadius: "4px",
  },
  favoriteButton: {
    fontSize: "20px",
    color: "#ff4757",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
    marginLeft: "10px",
  },
};

export default BookList;
