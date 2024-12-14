import React, { useEffect, useRef } from "react";
import "./FeaturedWorks.css";

const works = [
  { title: "광마회귀", author: "유진성", publisher: "네이버웹툰", image: "https://www.kmas.or.kr:443/common/file/atchmnflDownload.ajax?fileImageId=3000268562" },
  { title: "원피스109권", author: "오다 에이치로", publisher: "대원씨아이", image: "https://www.kmas.or.kr/common/file/atchmnflDownload.ajax?fileImageId=aa5bb281-127b-439d-ab0d-e30d528a2845" },
  { title: "먼작귀1", author: "나가노", publisher: "미우", image: "https://www.kmas.or.kr/common/file/atchmnflDownload.ajax?fileImageId=5631bec4-16b0-46a4-8904-ae8c5a912c53" },
  { title: "먼작귀2", author: "나가노", publisher: "미우", image: "https://www.kmas.or.kr/common/file/atchmnflDownload.ajax?fileImageId=a813c4da-6214-47dc-bf20-8e3c88ec1e19" },
  { title: "먼작귀3", author: "나가노", publisher: "미우", image: "https://www.kmas.or.kr/common/file/atchmnflDownload.ajax?fileImageId=6a610838-d39c-4a49-8d0b-4801ae846145" },
];

function FeaturedWorks() {
  const containerRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.3;

    const scroll = () => {
      if (!isPaused.current) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= container.scrollHeight / 2) {
          scrollPosition = 0;
        }
        container.scrollTop = scrollPosition;
      }
      requestAnimationFrame(scroll);
    };

    const originalContent = container.innerHTML;
    container.innerHTML += originalContent;

    scroll();

    return () => cancelAnimationFrame(scroll);
  }, []);

  const handleMouseEnter = () => {
    isPaused.current = true;
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  return (
    <div className="featured-container">
      <div
        className="featured-works"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {works.map((work, index) => (
          <div className="work-card" key={index}>
            <img src={work.image} alt={work.title} />
            <h3>{work.title}</h3>
            <p>{work.author} • {work.publisher}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedWorks;
