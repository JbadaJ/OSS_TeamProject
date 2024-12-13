import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainBanner from './components/MainBanner';
import Slider from './components/Slider';
import FeaturedWorks from './components/FeaturedWorks';
import SearchBook from './components/SearchBook'; // 책 검색 페이지
import Like from './components/Like'; // 선호작 페이지
import DetailPage from "./components/DetailPage";
import MaintoSearch from "./components/MainToSearch";
import Guide from "./components/guide";

function App() {
    return (
        <Router>
            <Header /> {/* 헤더는 모든 페이지에 공통으로 렌더링 */}
            <Routes>
                {/* 홈 페이지 */}
                <Route 
                    path="/" 
                    element={
                        <div>
                            <MainBanner />
                            <FeaturedWorks />
                            <Slider />
                        </div>
                    } 
                />
                
                {/* 책 검색 페이지 */}
                <Route path="/books" element={<SearchBook />} />

                {/* 선호작 페이지 */}
                <Route path="/like" element={<Like />} />
                <Route path="/detail/:isbn" element={<DetailPage />} />
                <Route path="/search" element={<MaintoSearch />} />
                <Route path= "/guide" element={<Guide/>} />
            </Routes>
        </Router>
    );
}

export default App;
