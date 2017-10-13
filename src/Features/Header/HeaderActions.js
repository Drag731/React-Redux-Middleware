export const CHANGE_USER_ROLE = 'CHANGE_USER_ROLE';

export const changeUserRole = (role) => ({
    type: CHANGE_USER_ROLE,
    payload: role,
});

