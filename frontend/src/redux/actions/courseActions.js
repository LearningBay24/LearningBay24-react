import { ActionTypes } from "../constants/action-types"

export const setCourses = (courses) => {
    return {
        type : ActionTypes.FETCH_COURSES,
        payload : courses
    };
};

export const selectedCourse = (course) => {
    return {
        type : ActionTypes.FETCH_COURSE,
        payload : course
    };
};
