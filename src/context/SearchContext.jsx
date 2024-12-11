import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Create the SearchContext
export const SearchContext = createContext();

// SearchProvider Component
export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState(""); // Holds the search query
    const location = useLocation(); // React Router hook to track current location

    // Clear search query on route change
    useEffect(() => {
        setSearchQuery(""); // Reset the search query whenever the route changes
    }, [location.pathname]); // Trigger on location path change

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};
