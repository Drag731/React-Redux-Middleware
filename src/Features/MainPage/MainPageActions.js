import axios from 'axios';
export const ADD_MOVIES = 'ADD_MOVIES';
export const SORT_BY_LIKES = 'SORT_BY_LIKES';
export const SORT_BY_RATING = 'SORT_BY_RATING';
export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const CHANGE_BUTTON_BG_COLOR = 'CHANGE_BUTTON_BG_COLOR';
export const FIND_ALL = 'FIND_ALL';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';

export const fetchMovies = () => {
    return (dispatch) => {
        dispatch(findAll());
        return axios.get('http://localhost:3001/movies')
            .then(response => dispatch(addMovies(response)))
    };
};

const findAll = () => ({
    type: FIND_ALL
});

const addMovies = payload => ({
    type: ADD_MOVIES,
    payload,
});

export const updateMovie = (data, id) => {
    return (dispatch) => {
        return axios.put(`http://localhost:3001/movies/${id}`, data)
            .then(response => dispatch(_updateMovie(response)))
    };
};

const _updateMovie = payload => ({
    type: UPDATE_MOVIE,
    payload
});

export const deleteMovie = (id) => {
  return (dispatch) => {
    return axios.delete(`http://localhost:3001/movies/${id}`)
      .then(response => dispatch(_deleteMovie(id)))
  }
}

const _deleteMovie = id => ({
  type: DELETE_MOVIE,
  payload: id
})

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

export const changeButtonBGColor = (flagButtonBGColor) => ({
    type: CHANGE_BUTTON_BG_COLOR,
    payload: flagButtonBGColor,
});

