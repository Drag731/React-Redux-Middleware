import axios from 'axios';
export const ADD_MOVIES = 'ADD_MOVIES';
export const SORT_BY_LIKES = 'SORT_BY_LIKES';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const LIKE_UP = 'LIKE_UP';
export const LIKE_DOWN = 'LIKE_DOWN';
export const CHANGE_STARS = 'CHANGE_STARS';
export const CHANGE_BUTTON_BG_COLOR = 'CHANGE_BUTTON_BG_COLOR';

export const fetchMovies = () => {
    return (dispatch) => {
        return axios.get('http://localhost:3001/movies')
            .then(response => dispatch(addMovies(response)))
    };
};

const addMovies = payload => ({
    type: ADD_MOVIES,
    payload,
});

export const sortMovieByLikes = (sortByLikes) => ({
    type: SORT_BY_LIKES,
    payload: sortByLikes
});

export const sortMovieByRating = (sortByRating) => ({
    type: SORT_BY_RATING,
    payload: sortByRating
});

export const search = (flagSearch) => ({
    type: SEARCH_MOVIE,
    payload: flagSearch
});

export const likeUp = (id) => ({
    type: LIKE_UP,
    payload: id
});

export const likeDown = (id) => ({
    type: LIKE_DOWN,
    payload: id
});

export const changeStars = (id, movieId) => ({
    type: CHANGE_STARS,
    payload: id,
    movieId: movieId
});

export const changeButtonBGColor = (flagButtonBGColor) => ({
    type: CHANGE_BUTTON_BG_COLOR,
    payload: flagButtonBGColor,
});

