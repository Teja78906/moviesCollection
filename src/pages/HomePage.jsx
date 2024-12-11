import React, { useEffect, useState, useContext } from "react";
import MovieTile from "../components/MovieTile"; // Adjust the import path as needed
import moviesData from "../components/movies_data.json"; // Import the movie data
import { SearchContext } from "../context/SearchContext"; // Import the SearchContext

const MoviesPage = ({ type }) => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 42;
    const visiblePageCount = 5;
    const { searchQuery } = useContext(SearchContext);

    useEffect(() => {
        const today = new Date();
        let filteredMovies = moviesData;
    
        // Apply type-specific filtering
        if (type === "upcoming") {
            // Upcoming movies: release date > today
            filteredMovies = moviesData.filter(
                (movie) => new Date(movie.release_date) > today
            );
        } else if (type === "old") {
            // Old movies: release date <= 2019-12-31
            filteredMovies = moviesData.filter(
                (movie) => new Date(movie.release_date) <= new Date("2019-12-31")
            );
        } else if (type === "newest") {
            // Newest movies: release date >= 2020-01-01 and < today
            filteredMovies = moviesData.filter(
                (movie) => 
                    new Date(movie.release_date) >= new Date("2020-01-01") && 
                    new Date(movie.release_date) <= today
            );
        }
    
        // Apply search filter
        if (searchQuery) {
            filteredMovies = filteredMovies.filter((movie) =>
                [movie.title, movie.overview, movie.Actors, movie.Director]
                    .filter(Boolean) // Ensure only valid fields are checked
                    .some((field) =>
                        field.toLowerCase().includes(searchQuery.toLowerCase())
                    )
            );
        }
    
        // Sort movies based on the type
        filteredMovies = filteredMovies.sort((a, b) => {
            const dateA = new Date(a.release_date);
            const dateB = new Date(b.release_date);
            
            if (type === "upcoming") {
                // Upcoming: Sort by ascending release date
                return dateA - dateB;
            } else {
                // Old and Newest: Sort by descending release date
                return dateB - dateA;
            }
        });
    
        setMovies(filteredMovies);
    }, [type, searchQuery]);
    

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const getPageNumbers = () => {
        const half = Math.floor(visiblePageCount / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + visiblePageCount - 1, totalPages);

        if (end - start + 1 < visiblePageCount) {
            start = Math.max(end - visiblePageCount + 1, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full bg-[rgb(10,10,10)]">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-5xl text-center text-white mt-20">
                    Where Quality & Clarity Matters
                </div>
                <div className="text-1xs text-center font-light text-white mt-5">
                    Watch Telugu movies in HD, exclusively available on Ott Platform
                </div>
                <div className="text-1xs text-center font-light text-white mt-0">
                    Developed to guide you to your love destination ott.
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center mt-14">
                    {currentMovies.length > 0 ? (
                        currentMovies.map((movie) => (
                            <MovieTile key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No movies match your search query.
                        </p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            className={`px-3 py-1 rounded ${
                                currentPage === 1
                                    ? "bg-[rgb(10,10,10)] text-white cursor-not-allowed"
                                    : "bg-[rgb(10,10,10)] text-white hover:bg-yellow-500 hover:text-black"
                            }`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            {"<<"}
                        </button>
                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                className={`px-3 py-1 rounded ${
                                    currentPage === page
                                        ? "bg-[rgb(10,10,10)] text-yellow-500"
                                        : "bg-[rgb(10,10,10)] text-white hover:bg-yellow-500 hover:text-black"
                                }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className={`px-3 py-1 rounded ${
                                currentPage === totalPages
                                    ? "bg-[rgb(10,10,10)] text-white cursor-not-allowed"
                                    : "bg-[rgb(10,10,10)] text-white hover:bg-yellow-500 hover:text-black"
                            }`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            {">>"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
