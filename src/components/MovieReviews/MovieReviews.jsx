import { useParams } from "react-router-dom";
import useDetails from "../../hooks/useDetails.jsx";
import { Loader } from "../Loader/Loader.jsx";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
    const { movieId } = useParams();
    const { isLoading, error, reviews } = useDetails(movieId, "reviews");

    if (isLoading) return <Loader/>;
    if (error) return;
    if (reviews.length === 0) return "We dont have any reviews for this movie yet.";

    return <ul>
        {reviews.map(({ id, author, content }) => {
            return (
                <li key={id} className={css.review}>
                    <p className={css.author}><b>👤 Author:</b> {author}</p>
                    <p>📜 {content}</p>
                </li>
            );
        })}
    </ul>;
}
