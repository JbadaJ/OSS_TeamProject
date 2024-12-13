import React, { useState } from "react";
import BookList from "./BookList"; // BookList 컴포넌트 가져오기

function Page1() {
    const [items, setItems] = useState([]); // 데이터 상태
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    const fetchData = async (search) => {
        setIsLoading(true);
        try {
          const targetUrl = `/openapi/search/bookAndWebtoonList?prvKey=c9c9eeedd12fc5ce4602648e80e4a337&title=${encodeURIComponent(search)}&viewItemCnt=100&pageNo=1`;
      
          console.log(`Fetching data from: ${targetUrl}`);
      
          const response = await fetch(targetUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setItems(data.itemList || []);
        } catch (error) {
          console.error("Fetch error:", error);
          setItems([]);
        } finally {
          setIsLoading(false);
        }
      };
      
    
    
    

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            fetchData(searchTerm);
        } else {
            alert("검색어를 입력하세요.");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <h1>상세 검색</h1>
            {/* 검색 입력 필드 */}
            <form
                onSubmit={handleSearch}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px",
                }}
            >
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "300px",
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                    }}
                />
                <button
                    type="submit"
                    className="btn btn-dark"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "50px",
                        height: "50px",
                        border: "none",
                        borderRadius: "50%",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M10 2a8 8 0 105.3 14.7l4 4a1 1 0 001.4-1.4l-4-4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                    </svg>
                </button>
            </form>

            {/* 로딩 상태 표시 */}
            {isLoading && (
                <div style={{ marginTop: "20px" }}>
                    <div className="spinner" />
                    <p>로딩 중...</p>
                </div>
            )}

            {/* 검색 결과 출력 */}
            {!isLoading && (
                <div style={{ marginTop: "20px", width: "100%" }}>
                    <BookList books={items} /> {/* BookList 컴포넌트에 검색 결과 전달 */}
                </div>
            )}
        </div>
    );
}

export default Page1;
