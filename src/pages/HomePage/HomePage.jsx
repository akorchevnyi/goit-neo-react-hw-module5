import useMovies from "../../hooks/useMovies.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function HomePage() {
    const { isLoading, error, data } = useMovies();

    if (isLoading) return <Loader/>;
    if (error) return;
    if (data.length === 0) return "No movies were found";

    return (
        <div className="container">
            <h2>⭐ Trending today</h2>
            <MovieList data={data}/>
        </div>
    );
};
