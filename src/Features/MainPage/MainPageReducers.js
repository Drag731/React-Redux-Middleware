import { ADD_NEW_MOVIE, SELECT_MOVIE, DELETE_MOVIE, 
    UPDATE_MOVIE, FIND_ALL, ADD_MOVIES, SEARCH_MOVIE, 
    SORT_BY_LIKES, SORT_BY_RATING } from './MainPageActions';

const initialState = {
    data: [],
    isFetching: true,
    sortBy: null,
    flagSearch: '',
    selectedMovieId: 1
};

const MoviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIES: {
            return {
                ...state,
                isFetching: false,
                data: action.payload.data,
            };
        }

        case FIND_ALL: {
            return {
                ...state,
                isFetching: true
            };
        }

        case UPDATE_MOVIE: {
            const updatedMovie = action.payload.data;
            const id = action.payload.data.id;

            return {
                ...state,
                data: state.data.map(movie => movie.id === id ? updatedMovie : movie)
            };
        }

        case DELETE_MOVIE: {
            const id = action.payload;

            return {
                ...state,
                data: state.data.filter(movie => movie.id !== id),
                selectedMovieId: 1
            };
        }

        case ADD_NEW_MOVIE: {
            return {
                ...state,
                data: [...state.data, action.payload],
                selectedMovieId: action.payload.id,
                isFetching: true
            }
        }

        case SORT_BY_LIKES: {
            return {
                ...state,
                sortBy: 'likes',
            };
        }

        case SORT_BY_RATING: {
            return {
                ...state,
                sortBy: 'rating',
            };
        }

        case SEARCH_MOVIE: {
            return {
                ...state,
                flagSearch: action.payload
            };
        }

        case SELECT_MOVIE: {
            return {
                ...state,
                selectedMovieId: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};

export const getisFetching = state => state.movies.isFetching;
export const getData = state => state.movies.data;

export const getFilteredMovies = state => {
    let filteredMovies = state.movies.data;
    if ( state.movies.sortBy === 'likes') {
        filteredMovies = [...state.movies.data].sort((a, b) => b.likes - a.likes);
    }

    if ( state.movies.sortBy === 'rating') {
        filteredMovies = [...state.movies.data].sort((a, b) => b.stars - a.stars);
    }

   return filteredMovies.filter((el) => {
        const regExp = new RegExp(state.movies.flagSearch, 'i');
        return ~el.title.search(regExp);
    });
};

export const getFlagSearch = state => state.movies.flagSearch;

export const getSelectedMovie = state => state.movies.data.find((movie) => {
    return movie.id === state.movies.selectedMovieId;
});

export default MoviesReducer;