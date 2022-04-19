import {combineReducers} from 'redux';
import {courseReducer, selectedCourseReducer} from "./courseReducer";

const allReducers = combineReducers({
    allCourses : courseReducer,
    course : selectedCourseReducer,
});
export default allReducers;
