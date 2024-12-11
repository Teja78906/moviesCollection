import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
// import OldMovies from "./pages/OldMovies";
// import NewestMovies from "./pages/NewestMovies";
// import UpcomingMovies from "./pages/UpcomingMovies";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage"
import { SearchProvider } from "./context/SearchContext"; // Import SearchProvider

function App() {
    return (
        <Router>
            <SearchProvider> {/* Move SearchProvider inside Router */}
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage type="newest"/>} />
                        <Route path="/movies/:id" element={<MoviePage />} />
                        <Route path="/old-movies" element={<HomePage type="old"/>} />
                        <Route path="/latest-movies" element={<HomePage type="newest"/>} />
                        <Route path="/upcoming-movies" element={<HomePage type="upcoming"/>} />
                    </Routes>
                    <Footer />
                </div>
            </SearchProvider>
        </Router>
    );
}

export default App;
