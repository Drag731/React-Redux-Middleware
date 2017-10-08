import { DELETE_MOVIE, UPDATE_MOVIE, FIND_ALL, ADD_MOVIES, SEARCH_MOVIE, SORT_BY_LIKES, SORT_BY_RATING, CHANGE_BUTTON_BG_COLOR } from './MainPageActions';

const initialState = {
    data: [],
    isFetching: true,
    sortByLikes: 'on',
    sortByRating: 'on',
    flagButtonBGColor: true,
    flagSearch: '',
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
                data: state.data.filter(movie => movie.id !== id)
            };
        }

        case SORT_BY_LIKES: {
            return {
                ...state,
                data: state.data.sort(function(a,b) {
                    if (action.payload === 'on') {
                         return  a.likes - b.likes; 
                    } else {
                        return  a.likes + b.likes; 
                    }
                }),
                sortByLikes: action.payload === 'on' ? 'off' : 'on',
            };
        }

        case SORT_BY_RATING: {
            return {
                ...state,
                data: state.data.sort(function(a,b) {
                    if (action.payload === 'on') {
                        return  a.stars - b.stars; 
                    } else {
                        return  a.stars + b.stars;
                    }
                }),
                sortByRating: action.payload === 'on' ? 'off' : 'on',
            };
        }

        case SEARCH_MOVIE: {
            return {
                ...state,
                flagSearch: action.payload
            };
        }

        case CHANGE_BUTTON_BG_COLOR: { 
            return {
                ...state,
                flagButtonBGColor: !action.payload
            };
        }

        default: {
            return state;
        }
    }
};

export const getisFetching = state => state.movies.isFetching;
export const getData = state => state.movies.data;
export const getMovies = state => state.movies.data.filter(function(el) {
                    const regExp = new RegExp(state.movies.flagSearch, 'i')
                    return ~el.title.search(regExp);
                });
export const getMovieByLikes = state => state.movies.sortByLikes;
export const getFlagSearch = state => state.movies.flagSearch;
export const getMovieByRating = state => state.movies.sortByRating;
export const getButtonBGColor = state => state.movies.flagButtonBGColor;

// export const getSelectedMovie = state => state.movies.data.find((movie) => {
//     return movie.id === state.movies.selectedMovieId;
// });

export default MoviesReducer;