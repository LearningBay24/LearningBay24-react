import React, {useEffect} from "react";
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setCourses} from '../redux/actions/courseActions';
import {ActionTypes} from '../redux/constants/action-types';

const courseListing = () => {
    const courses = useSelector(state => state);
    const dispatch = useDispatch();

    const fetchCourses = async () => {
        const response = await axios
        .get("https://fakestoreapi.com/products")
        .catch((err) => {
            dispatch( {
                type: ActionTypes.ERROR,
                payload: err,
            })
            console.log("Err", err);
        });
        dispatch(setCourses(response.data));
        console.log(response.data);
    };

    useEffect(() => { fetchCourses(); }, []);

    console.log(courses);

    return (
        <div>
            //TODO
        </div>
    );
};

export default courseListing;
