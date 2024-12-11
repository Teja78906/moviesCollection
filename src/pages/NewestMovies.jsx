import React, { useEffect, useState, useContext } from "react";
import MovieTile from "../components/MovieTile"; // Adjust the import path as needed
import moviesData from "../components/movies_data.json"; // Import the movie data
import { SearchContext } from "../context/SearchContext"; // Import the SearchContext

const NewestMovies = () => {
    const [newestMovies, setNewestMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const moviesPerPage = 30; // Number of movies to show per page
    const visiblePageCount = 5; // Maximum visible page numbers at a time
    const { searchQuery } = useContext(SearchContext); // Get the search query from context

    useEffect(() => {
        const today = new Date(); // Current date
        const startDate = new Date("2018-01-01"); // Start date (2018-01-01)

        // Filter movies released between 2018-01-01 and today
        let filteredMovies = moviesData.filter((movie) => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate >= startDate && releaseDate <= today;
        });

        // Apply search query if provided
        if (searchQuery) {
            filteredMovies = filteredMovies.filter((movie) =>
                [movie.title, movie.overview, movie.Actors]
                    .filter(Boolean)
                    .some((field) =>
                        field.toLowerCase().includes(searchQuery.toLowerCase())
                    )
            );
        }

        // Sort movies by release date (newest first)
        const sortedMovies = filteredMovies.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
        });

        setNewestMovies(sortedMovies); // Update state with sorted movies
    }, [searchQuery]); // Re-run when search query changes

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = newestMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(newestMovies.length / moviesPerPage);

    // Calculate visible page numbers
    const getPageNumbers = () => {
        const half = Math.floor(visiblePageCount / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + visiblePageCount - 1, totalPages);

        // Adjust the range if near boundaries
        if (end - start + 1 < visiblePageCount) {
            start = Math.max(end - visiblePageCount + 1, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    // Page change handler
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 bg-black">
            <h1 className="text-4xl font-bold text-center text-yellow-500 mb-6">Latest Movies</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                {currentMovies.length > 0 ? (
                    currentMovies.map((movie) => (
                        <MovieTile key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p className="text-center col-span-full text-lg text-gray-500">
                        No movies found matching your search.
                    </p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {/* Previous Button */}
                <button
                    className={`px-3 py-1 rounded ${
                        currentPage === 1
                            ? "bg-red-500 text-gray-300 cursor-not-allowed"
                            : "bg-red-800 text-white hover:bg-yellow-500"
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1 rounded ${
                            currentPage === page
                                ? "bg-yellow-500 text-black"
                                : "bg-gray-600 text-white hover:bg-yellow-500"
                        }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                            ? "bg-red-500 text-gray-300 cursor-not-allowed"
                            : "bg-red-800 text-white hover:bg-yellow-500"
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default NewestMovies;
