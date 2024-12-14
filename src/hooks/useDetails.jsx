import { useEffect, useState } from "react";
import tmdb from "../api/axiosInstance.js";
import iziToast from "izitoast";

export default function useDetails(id, action) {
    const [details, setDetails] = useState();
    const [reviews, setReviews] = useState();
    const [cast, setCast] = useState();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id || !action) return;
        setIsLoading(true);

        (async () => {
                try {
                    switch (action) {
                        case "details": {
                            const res = await tmdb.getMovieDetails(id);
                            if (!res) throw new Error("No data");
                            setDetails(res);
                            setCast(null);
                            setReviews(null);
                            break;
                        }

                        case "cast": {
                            const res = await tmdb.getCast(id);
                            const { cast } = res;
                            if (!cast) throw new Error("No data");
                            setCast(cast);
                            break;
                        }

                        case "reviews": {
                            const res = await tmdb.getReviews(id);
                            const { results } = res;
                            if (!results) throw new Error("No data");
                            setReviews(results);
                            break;
                        }

                        default:
                            throw new Error("Unknown action");
                    }

                } catch (error) {
                    console.error("Fetch data error: ", error instanceof Error ? error.message : error);
                    iziToast.error({ title: "Error!", message: "Failed to load details. Please try again later!", position: "topRight" });
                    setError(error);
                } finally {
                    setIsLoading(false);
                }
            }
        )();

    }, [action, id]);

    return { isLoading, error, details, reviews, cast };
}
