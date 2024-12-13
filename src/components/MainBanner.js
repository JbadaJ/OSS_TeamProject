import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router에서 useNavigate 가져오기

function MainBanner() {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`); // 검색어를 URL로 전달
        } else {
            alert("검색어를 입력하세요!");
        }
    };
    const handleSearchClick = () => {
        navigate('/books'); // '/search' 경로로 이동
    };

    return (
        <section className="bg-warning py-5">
            <div className="container d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="display-4 fw-bold mb-3">만화 정보는 역시<br />만화 장바구니</h1>
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control w-75 me-2"
                            placeholder="만화, 웹툰, 작가를 검색해보세요"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력
                        />
                        <button className="btn btn-dark" onClick={handleSearch}> {/* 검색 버튼 */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M10 2a8 8 0 105.3 14.7l4 4a1 1 0 001.4-1.4l-4-4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
                                />
                            </svg>
                        </button>
                        <button
                            className="btn btn-outline-dark ms-2 px-3"
                            style={{ minWidth: "120px" }}
                            onClick={handleSearchClick} // 클릭 이벤트 추가
                        >
                            상세 검색
                        </button>
                    </div>
                </div>
                <div>
                    <img
                        src="/promo.png"
                        alt="프로모션 이미지"
                        className="img-fluid rounded"
                        style={{ maxWidth: '300px', height: 'auto' }}
                    />
                    <p className="mt-3 text-center text-secondary">
                        방대한 만화를 자유롭게 골라보세요
                    </p>
                </div>
            </div>
        </section>
    );
}

export default MainBanner;
