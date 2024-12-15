import { useEffect, useState, useRef } from "react";
import css from "./MoviesPage.module.css";
import tmdb from "../../api/axiosInstance.js";
import iziToast from "izitoast";
import { Loader } from "../../components/Loader/Loader.jsx";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function MoviesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const cacheRef = useRef({});

    const [inputValue, setInputValue] = useState(query);

    useEffect(() => {
        setInputValue(query);

        if (query.trim().length < 3) return;

        if (cacheRef.current[query]) {
            setData(cacheRef.current[query]);
            return;
        }

        fetchData(query);
    }, [query]);

    const fetchData = async (query) => {
        setIsLoading(true);
        try {
            const res = await tmdb.getSearch(query);
            const { results } = res;
            if (!results) throw new Error("No data");
            setData(results);
            cacheRef.current[query] = results;
        } catch (error) {
            console.error("Search error", error instanceof Error ? error.message : error);
            iziToast.error({ title: "Error", message: "Failed to search. Please try again later!", position: "topRight" });
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => setInputValue(e.target.value);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (inputValue.trim().length < 3) {
            iziToast.warning({
                title   : "Warning",
                message : "Search string must be at least 3 characters long!",
                position: "topRight"
            });
            return;
        }
        setSearchParams({ search: inputValue });
    };

    if (isLoading) return <Loader/>;
    if (error) return <div>Error occurred: {error.message || "An unknown error occurred"}</div>;

    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <input type="text" value={inputValue} onChange={handleChange} className={css.input}/>
                <button type="submit" className={css.btn}>
                    Search
                </button>
            </form>
            <MovieList data={data}/>
            {data?.length === 0 && "No results"}
        </div>
    );
}
