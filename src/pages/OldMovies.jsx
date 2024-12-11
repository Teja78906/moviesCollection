import React, { useEffect, useState, useContext } from "react";
import MovieTile from "../components/MovieTile"; // Adjust the import path as needed
import moviesData from "../components/movies_data.json"; // Import the movie data
import { SearchContext } from "../context/SearchContext"; // Import SearchContext

const OldMovies = () => {
    const [oldMovies, setOldMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const moviesPerPage = 30; // Number of movies per page
    const visiblePageCount = 5; // Maximum visible page numbers
    const { searchQuery } = useContext(SearchContext); // Get search query from context

    useEffect(() => {
        // Filter movies with release date before 2018
        let filteredMovies = moviesData.filter((movie) => {
            const releaseYear = new Date(movie.release_date).getFullYear();
            return releaseYear < 2018;
        });

        // Sort the old movies by release date in descending order
        filteredMovies = filteredMovies.sort((a, b) => {
            return new Date(b.release_date) - new Date(a.release_date);
        });

        // Apply search filter if a query is present
        if (searchQuery) {
            filteredMovies = filteredMovies.filter((movie) =>
                [movie.title, movie.overview, movie.Actors]
                    .filter(Boolean) // Ensure no undefined/null values
                    .some((field) =>
                        field.toLowerCase().includes(searchQuery.toLowerCase())
                    )
            );
        }

        setOldMovies(filteredMovies);
    }, [searchQuery]); // Re-run when searchQuery changes

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = oldMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(oldMovies.length / moviesPerPage);

    // Page range for pagination
    const getPageNumbers = () => {
        const half = Math.floor(visiblePageCount / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + visiblePageCount - 1, totalPages);

        // Adjust start if near the end
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
        <div className="w-full max-w-screen-xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6">Old Movies</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
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

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {/* Previous Button */}
                <button
                    className={`px-3 py-1 rounded ${
                        currentPage === 1
                            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-yellow-500"
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
                                : "bg-gray-800 text-white hover:bg-yellow-500"
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
                            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                            : "bg-gray-800 text-white hover:bg-yellow-500"
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

export default OldMovies;
