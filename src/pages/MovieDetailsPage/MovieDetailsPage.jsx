import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useDetails from "../../hooks/useDetails.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import css from "./MovieDetailsPage.module.css";
import { IMAGE_BASE_URL } from "../../constants.js";


export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const backUrl = location.state ?? "/";


    const { isLoading, error, details } = useDetails(movieId, "details");
    if (isLoading) return <Loader/>;
    if (error) return;

    const { poster_path: posterPath, title, genres, vote_average: userScore, overview, release_date: year } = details;


    return (
        <div className="container">
            <Link to={backUrl} className="back-btn">← Back</Link>

            <div className={css.wrapper}>
                <img src={IMAGE_BASE_URL + posterPath} width="200" alt={title}/>
                <div className={css.infoBlock}>
                    <h3>{title} ({year.split("-")[0]})</h3>
                    <p><b>User score:</b> {Math.floor(userScore * 10)}%</p>
                    <div>
                        <b>Overview:</b>
                        <p>{overview}</p>
                    </div>
                    <div>
                        <b>Genres:</b> <p>{genres.map(({ name }) => name).join(", ")}</p>
                    </div>
                </div>
            </div>

            <hr/>
            <h5>Additional information</h5>

            <ul className={css.additionalList}>
                <li>
                    <Link className="back-btn" to={`reviews`} state={location.state}>Reviews</Link>
                </li>
                <li>
                    <Link className="back-btn" to={`cast`} state={location.state}>Cast</Link>
                </li>
            </ul>

            <hr/>

            <Outlet/>
        </div>
    );
}
