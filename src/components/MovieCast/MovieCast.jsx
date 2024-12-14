import useDetails from "../../hooks/useDetails.jsx";
import { useParams } from "react-router-dom";
import { Loader } from "../Loader/Loader.jsx";
import css from "./MovieCast.module.css";
import { IMAGE_BASE_URL } from "../../constants.js";

export default function MovieCast() {
    const { movieId } = useParams();
    const { isLoading, error, cast } = useDetails(movieId, "cast");

    if (isLoading) return <Loader/>;
    if (error) return;

    return <ul className={css.list}>

        {cast.slice(0, 10).map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.castItem}>
                <img src={IMAGE_BASE_URL + profile_path} width={50} height="auto" alt={name}/>

                <div>
                    <p>{name}</p>
                    <p>Character: {character}</p>
                </div>
            </li>
        ))}
    </ul>;
}
