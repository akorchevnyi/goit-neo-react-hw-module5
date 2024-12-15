import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ data }) {
    const location = useLocation();

    return <ul className={css.movieList}>
        {data && data.map(({ id, title }) => {
                return (
                    <li key={id}>
                        <Link to={`/movies/${id}`} className={css.movieList} state={location}>🎥 {title}</Link>
                    </li>
                );
            }
        )}
    </ul>;
}
