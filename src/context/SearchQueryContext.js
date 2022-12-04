import { createContext } from "react";

export const SearchQueryContext = createContext({
    searchQuery: '',
    setSearchQuery: () => {}
})