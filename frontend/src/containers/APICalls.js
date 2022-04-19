import React, {Component} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCourses} from '../redux/actions/courseActions';
import {ActionTypes} from "../redux/constants/action-types";

export default class CourseAPI extends Component
{
    const dispatch = useDispatch();

    fetchCourses = async () =>
    {
        const response = await axios.get("https://fakestoreapi.com/products").catch((err) =>
        {
            dispatch(
            {
                type: ActionTypes.ERROR,
                payload: err,
            });
            console.log("Err", err);
        });

        dispatch(setCourses(response.data));
        console.log(response.data);
    };

    useEffect(() => 
    {
       fetchCourses(); 
    }, []);
}

