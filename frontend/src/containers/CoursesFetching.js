import React, {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCourses} from '../redux/actions/courseActions';
import CoursePreview from "./CoursePreview";
import {ActionTypes} from "../redux/constants/action-types";


const CoursesFetching = () => {
    useEffect(() => {fetchCourses();}, []);
};

export default CoursesFetching;
