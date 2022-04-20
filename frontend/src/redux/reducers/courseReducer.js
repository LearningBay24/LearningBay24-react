import {ActionTypes} from "../constants/action-types";

const initialState = {
    courses: [],
    loading:true
}

export const courseReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.FETCH_COURSES:
            return {
                ...state, 
                courses: payload, 
                loading:false
            };
        case ActionTypes.ERROR:
        return{
            loading: false, 
            error: payload 
        }    
        default:
            return state;
    };
};

export const selectedCourseReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ActionTypes.FETCH_COURSE:
            return {
                ...state, 
                ...payload, 
                loading:false
            };
        case ActionTypes.ERROR:
            return{
                loading: false, 
                error: payload 
            }; 
        default:
            return state;
    };
};
