import React, { useEffect, useRef } from "react";
import "./FeaturedWorks.css";

const works = [
  { title: "[전자책]도원암귀 14권", author: "우루시바라 유라", publisher: "S코믹스", image: "https://via.placeholder.com/300x400" },
  { title: "[전자책]양아치가 고...", author: "츠네키 네타로", publisher: "S코믹스", image: "https://via.placeholder.com/300x400" },
  { title: "[전자책]내 최애는 악...", author: "아오노 시모", publisher: "S코믹스", image: "https://via.placeholder.com/300x400" },
  { title: "[전자책]드래콘! 4권", author: "쇼쿠바이 히로요미", publisher: "S코믹스", image: "https://via.placeholder.com/300x400" },
  { title: "[전자책]마녀의 여행 3권", author: "나나오 이츠키", publisher: "S코믹스", image: "https://via.placeholder.com/300x400" },
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
