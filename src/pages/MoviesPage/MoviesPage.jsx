import { useEffect, useState,  useRef } from "react";
import css from "./MoviesPage.module.css";
import tmdb from "../../api/axiosInstance.js";
import iziToast from "izitoast";
import { Loader } from "../../components/Loader/Loader.jsx";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function MoviesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const location = useLocation();

    const cacheRef = useRef({});

    useEffect(() => {
        if (query.trim().length < 3) return;

        if (cacheRef.current[query]) {
            setData(cacheRef.current[query]);
            return;
        }

        fetchData(query);
    }, []);

    const handleChange = e => setSearchParams({ search: e.target.value });

    const handleSearch = async e => {
        e.preventDefault();
        if (query.trim().length < 3) {
            iziToast.warning(
                {
                    title   : "Warning",
                    message : "Search string must be at least 3 characters long!",
                    position: "topRight"
                });
            return;
        }

        setData(null);

        // Проверяем кэш перед запросом
        if (cacheRef.current[query]) {
            setData(cacheRef.current[query]);
            return;
        }

        await fetchData(query);
    };

    async function fetchData(query) {
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
    }

    if (isLoading) return <Loader />;
    if (error) return;

    return (
        <div className="container">
            <form onSubmit={handleSearch}>
                <input type="text" value={query} onChange={handleChange} className={css.input} />
                <button type="submit" className={css.btn}>Search</button>
            </form>

            <ul className={css.list}>
                {data?.length > 0 && data.map(({ id, title }) => (
                    <li key={id}>
                        <Link to={`/movies/${id}`} className="back-btn" state={location}>🎥 {title}</Link>
                    </li>
                ))}
                {data?.length === 0 && "No results"}
            </ul>
        </div>
    );
}
