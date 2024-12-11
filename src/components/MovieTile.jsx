import React from "react";
import { Link } from "react-router-dom";

const MovieTile = ({ movie }) => (
  <Link
    to={`/movies/${movie.id}`}
    className="block bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 my-4"
    style={{ width: "180px", height: "280px" }} // Enforce fixed size
  >
    <div
      className="w-full h-full flex flex-col justify-between" // Ensure consistent layout
    >
      {/* Image Section */}
      <div className="flex-grow">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg"
          style={{ maxHeight: "240px" }} // Ensure the image does not exceed its section
        />
      </div>

      {/* Title Section */}
      <div className="bg-[rgb(10,10,10)] py-1 text-white rounded-b-lg">
        <h3 className="pl-1 text-sm font-semibold truncate">{movie.title}</h3>
        <h3 className="pl-1 text-sm text-yellow-400 font-semibold">
          {new Date(movie.release_date).getFullYear()}
        </h3>
      </div>
    </div>
  </Link>
);

export default MovieTile;
