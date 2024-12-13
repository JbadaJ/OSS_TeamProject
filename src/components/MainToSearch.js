import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookList from "./BookList"; // 검색 결과를 렌더링할 컴포넌트

const SearchBook = () => {
    const location = useLocation(); // 현재 URL 정보 가져오기
    const queryParams = new URLSearchParams(location.search); // URLSearchParams를 사용하여 쿼리 파라미터 읽기
    const searchTerm = queryParams.get("query"); // 'query'라는 이름의 검색어 추출

    const [items, setItems] = useState([]); // 검색 결과 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        const fetchBooks = async () => {
            if (!searchTerm) return; // 검색어가 없으면 아무 작업도 하지 않음
            try {
                const targetUrl = `/openapi/search/bookAndWebtoonList?prvKey=c9c9eeedd12fc5ce4602648e80e4a337&title=${encodeURIComponent(
                    searchTerm
                )}&viewItemCnt=100&pageNo=1`;

                const response = await fetch(targetUrl);
                const data = await response.json();

                if (data.result?.resultState === "success" && data.itemList) {
                    setItems(data.itemList); // 검색 결과 저장
                } else {
                    setItems([]);
                }
            } catch (error) {
                console.error("검색 중 오류 발생:", error);
                setItems([]);
            } finally {
                setLoading(false); // 로딩 상태 업데이트
            }
        };

        fetchBooks();
    }, [searchTerm]);

    if (loading) return <p>로딩 중...</p>;
    if (!items.length) return <p>검색 결과가 없습니다.</p>;

    return <BookList books={items} />; // 검색 결과 렌더링
};

export default SearchBook;
