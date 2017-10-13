import { CHANGE_USER_ROLE } from './HeaderActions';

const initialState = {
    userRole: 'admin',
};

const HeaderReducer = (state = initialState, action) => {
    switch (action.type) {

        case CHANGE_USER_ROLE: {
            return {
                ...state,
                userRole: action.payload
            };
        }

        default: {
            return state;
        }
    }
};

export const getUserRole = state => state.header.userRole;

export default HeaderReducer;