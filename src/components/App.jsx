import "./App.css";
import "izitoast/dist/css/iziToast.min.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "./Loader/Loader.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const Navigation = lazy(() => import("./Navigation/Navigation.jsx"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage.jsx"));
const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage/MovieDetailsPage.jsx"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews.jsx"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage.jsx"));


export default function App() {

    return (
        <Suspense fallback={<Loader/>}>
            <div>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/movies" element={<MoviesPage/>}/>
                    <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
                        <Route path="reviews" element={<MovieReviews/>}/>
                        <Route path="cast" element={<MovieCast/>}/>
                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </div>
        </Suspense>
    );
}
