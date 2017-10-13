import { SET_FORM_DATA } from './FormActions.js'

const initialState = {
    formData: {
        id: '',
        title: '',
        posterUrl: '',
        director: '',
        actors: '',
        genres: '',
        description: ''
    }
}

export const FormReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FORM_DATA: {
            return {
                formData: { ...state.formData, ...action.payload}
            }
        }

        default: {
            return state
        }
    }
}

export const getFormData = state => state.form.formData || initialState.formData
