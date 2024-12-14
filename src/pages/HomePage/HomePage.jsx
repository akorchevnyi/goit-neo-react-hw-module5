import useMovies from "../../hooks/useMovies.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import css from "./HomePage.module.css";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { isLoading, error, data } = useMovies();

    if (isLoading) return <Loader/>;
    if (error) return;
    if (data.length === 0) return "No movies were found";

    return (
        <div className="container">

            <h2>⭐ Trending today</h2>

            <ul className={css.movieList}>
                {data.map(({ id, title }) => {
                        return (
                            <li key={id}>
                                <Link to={`/movies/${id}`} className={css.movieItem}>🎥 {title}</Link>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
};
