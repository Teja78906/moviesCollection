import React, { useEffect, useState } from "react";
import MovieTile from "./MovieTile";
import moviesData from "./movies_data.json"; // Import the JSON file directly

const Dashboard = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Sort the movies by release date (newest to oldest)
        const sortedMovies = moviesData.sort((a, b) => {
            const dateA = new Date(a.release_date);
            const dateB = new Date(b.release_date);
            return dateB - dateA; // Sort in descending order (newest first)
        });
        
        // Set the sorted movies data in state
        setMovies(sortedMovies);
    }, []);

    return (
        <div className="container w-full max-w-screen-xl mx-auto px-4"> {/* Ensure 90% width of the window */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center px-4"> {/* Dynamic grid layout */}
            {movies.map((movie) => (
                <MovieTile key={movie.id} movie={movie} />
            ))}
        </div>
        </div>
    );
};

export default Dashboard;
