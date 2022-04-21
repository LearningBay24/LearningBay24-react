import {combineReducers} from 'redux';
//import {courseReducer, selectedCourseReducer} from "./courseReducer";
import rootReducer from '../reducers'

const allReducers = combineReducers({
//    allCourses : courseReducer,
//    course : selectedCourseReducer,
    rootReducer,
});
export default allReducers;
