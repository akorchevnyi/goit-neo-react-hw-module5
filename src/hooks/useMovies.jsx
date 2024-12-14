import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import tmdb from "../api/axiosInstance.js";

export default function useMovies() {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);

        (async () => {
                try {
                    const res = await tmdb.getTrending();
                    const { results } = res || {};
                    if (!results) throw new Error("No data");
                    setData(results);
                } catch (error) {
                    console.error("Fetch data error: ", error instanceof Error ? error.message : error);
                    toast.error("Failed to load data. Please try again later.");
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            }
        )();

    }, []);

    return { data, error, isLoading };
}
