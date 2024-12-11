import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../components/movies_data.json"; // Import the local JSON file

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false); // State to toggle trailer visibility

  useEffect(() => {
    const selectedMovie = moviesData.find((m) => m.id === parseInt(id));
    setMovie(selectedMovie);
  }, [id]);

  if (!movie)
    return (
      <div className="min-h-screen bg-[rgb(10,10,10)] text-white flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[rgb(10,10,10)] text-white p-6">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <div
          className="relative w-full h-96 bg-cover bg-center mb-8"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black to-transparent">
            <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
          </div>
        </div>
      )}

      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* Poster */}
        <div className="w-full lg:w-1/3">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
        </div>

        {/* Details */}
        <div className="w-full lg:w-2/3 space-y-4">
          <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
          <p className="text-lg italic text-gray-300">
            {movie.overview || "No overview available."}
          </p>
          <div className="flex items-center gap-6 mb-6">
            <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
              ⭐ {movie.vote_average} / 10
            </span>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Rating: {movie.rating || "Not Rated"}
            </span>
            <span className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Popularity: {movie.popularity}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 text-gray-300">
            <p>
              <strong>Director:</strong> {movie.Director || "Unknown"}
            </p>
            <p>
              <strong>Writer:</strong> {movie.Writer || "Unknown"}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors || "Not Listed"}
            </p>
            <p>
              <strong>Original Title:</strong> {movie.original_title}
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Language:</strong> Telugu
            </p>
            <p>
              <strong>Adult Content:</strong> {movie.adult ? "Yes" : "No"}
            </p>
            <p>
              <strong>Overview:</strong> {movie.Plot ? movie.Plot : movie.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      <div className="mt-10">
        <h2 className="text-4xl font-bold text-white mb-6">Watch Trailer</h2>
        <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center bg-[rgb(5,5,5)] rounded-lg shadow-lg overflow-hidden">
          {!showTrailer ? (
            <>
              {/* Trailer Box */}
              <div className="relative w-[85%] h-[85%] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center shadow-xl">
                {/* Play Button */}
                <button
                  onClick={() => setShowTrailer(true)}
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 hover:bg-opacity-50 transition-opacity z-10 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-white group-hover:text-yellow-400 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-6.352-3.696A1 1 0 007 8.172v7.656a1 1 0 001.4.914l6.352-3.696a1 1 0 000-1.714z"
                    />
                  </svg>
                </button>
                {/* Placeholder Image */}
                <img
                  src={movie.poster_path}
                  alt="Trailer Placeholder"
                  className="w-full h-full object-cover filter brightness-75 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </>
          ) : (
              <div className="relative w-[85%] h-[85%] bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                <iframe
                   src={movie.trailer_link ? movie.trailer_link.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/n75xEs-9u1I"}
                  title="YouTube video player"
                  className="absolute inset-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;


