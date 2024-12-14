import axios from "axios";
import { TMDB_ACCESS_API_KEY } from "../constants.js";

const API_CONFIG = {
    baseURL: "https://api.themoviedb.org/3",
    timeout: 10000,
    headers: { "Authorization": `Bearer ${TMDB_ACCESS_API_KEY}`, "accept": "application/json" }
};


class Tmdb {
    constructor() {
        this.api = axios.create(API_CONFIG);

        this.api.interceptors.response.use(
            response => response.data,
            error => Promise.reject(error)
        );
    }


    async getTrending() {
        return await this.api.get("/trending/movie/day");
    }

    async getMovieDetails(id) {
        return await this.api.get(`/movie/${id}`);
    }

    async getCast(id) {
        return await this.api.get(`/movie/${id}/credits`);
    }

    async getReviews(id) {
        return await this.api.get(`/movie/${id}/reviews?page=1`);
    }

    async getSearch(query) {
        return await this.api.get(`/search/movie?query=${query}`);
    }
}


const tmdb = new Tmdb();

export default tmdb;
